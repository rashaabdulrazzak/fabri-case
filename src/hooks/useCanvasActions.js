import { useCallback } from 'react';

export const useCanvasActions = (canvas) => {
  const handleImageZoomIn = useCallback(() => {
    if (!canvas) return;
    const zoom = canvas.getZoom();
    canvas.setZoom(zoom + 0.1);
  }, [canvas]);

  const handleImageZoomOut = useCallback(() => {
    if (!canvas) return;
    const zoom = canvas.getZoom();
    canvas.setZoom(zoom - 0.1);
  }, [canvas]);

  const handleImagePanStart = useCallback(() => {
    if (!canvas) return;
    canvas.defaultCursor = 'grab';
    canvas.hoverCursor = 'grab';
  }, [canvas]);

  const handleImagePanEnd = useCallback(() => {
    if (!canvas) return;
    canvas.defaultCursor = 'default';
    canvas.hoverCursor = 'move';
  }, [canvas]);

  const handleImagePanReset = useCallback(() => {
    if (!canvas) return;
    canvas.viewportTransform[4] = 0;
    canvas.viewportTransform[5] = 0;
    canvas.setZoom(1);
    canvas.requestRenderAll();
  }, [canvas]);

  const handleImageClear = useCallback((imageUrl) => {
    if (!canvas) return;
    canvas.clear();
    if (imageUrl) {
      canvas.setBackgroundImage(imageUrl, canvas.renderAll.bind(canvas));
    }
  }, [canvas]);

  const handleImageUndo = useCallback(() => {
    if (!canvas) return;
    const objects = canvas.getObjects();
    if (objects.length > 0) {
      canvas.remove(objects[objects.length - 1]);
      canvas.renderAll();
    }
  }, [canvas]);

  const handleImageDownload = useCallback(() => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
    });
    const link = document.createElement('a');       
    link.href = dataURL;
    link.download = 'canvas.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [canvas]);

  return {
    handleImageZoomIn,
    handleImageZoomOut,
    handleImagePanStart,
    handleImagePanEnd,
    handleImagePanReset,
    handleImageClear,
    handleImageUndo,
    handleImageDownload,
  };
};