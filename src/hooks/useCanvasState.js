import { useCallback } from 'react';
import { fabric } from 'fabric';

export const useCanvasState = (canvas, imageUrl, setImageUrl) => {
  const saveCanvasState = useCallback(() => {
    if (!canvas || !imageUrl) return null;

    const objects = canvas.getObjects().map(obj => ({
      ...obj.toObject(),
      dataType: obj.dataType,
    }));

    return {
      imageUrl,
      objects,
      viewportTransform: canvas.viewportTransform,
    };
  }, [canvas, imageUrl]);

  const loadCanvasState = useCallback(async (savedState) => {
    if (!canvas) return;

    const state = typeof savedState === 'string' 
      ? JSON.parse(savedState) 
      : savedState;

    if (!state?.imageUrl) return;

    // First set the image URL to trigger image loading
    setImageUrl(state.imageUrl);

    // Wait for the image to load and canvas to be ready
    return new Promise((resolve) => {
      const checkImageLoaded = () => {
        // Proper way to check if background image is loaded
        if (canvas.backgroundImage && canvas.backgroundImage._element && canvas.backgroundImage._element.complete) {
          // Clear existing objects (except background)
          canvas.getObjects().forEach(obj => {
            if (obj !== canvas.backgroundImage) {
              canvas.remove(obj);
            }
          });

          // Load annotations
          if (state.objects?.length > 0) {
            fabric.util.enlivenObjects(state.objects, (enlivenedObjects) => {
              enlivenedObjects.forEach(obj => {
                if (obj.dataType) obj.set('dataType', obj.dataType);
                canvas.add(obj);
              });
              
              if (state.viewportTransform) {
                canvas.setViewportTransform(state.viewportTransform);
              }
              
              canvas.renderAll();
              resolve();
            });
          } else {
            resolve();
          }
        } else {
          setTimeout(checkImageLoaded, 50);
        }
      };

      checkImageLoaded();
    });
  }, [canvas, setImageUrl]);

  const saveToLocalStorage = useCallback(() => {
    const state = saveCanvasState();
    if (state) {
      localStorage.setItem('savedCanvasState', JSON.stringify(state));
    }
  }, [saveCanvasState]);

  const loadFromLocalStorage = useCallback(async () => {
    const savedState = localStorage.getItem('savedCanvasState');
    if (savedState) {
      await loadCanvasState(savedState);
    }
  }, [loadCanvasState]);

  return {
    saveCanvasState,
    loadCanvasState,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
};