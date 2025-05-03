import { useEffect, useState } from 'react';
import { fabric } from 'fabric';

export const useFabricCanvas = (canvasRef, imageUrl) => {
  const [canvas, setCanvas] = useState(null);

  // Initialize canvas
  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current, {
      backgroundColor: '#f0f0f0',
      selection: true,
    });

    setCanvas(canvasInstance);

    return () => {
      canvasInstance.dispose();
    };
  }, [canvasRef]);

  // Load image into canvas
  useEffect(() => {
    if (!canvas || !imageUrl) return;

    fabric.Image.fromURL(imageUrl, (img) => {
      const scaleX = canvas.getWidth() / img.width;
      const scaleY = canvas.getHeight() / img.height;
      const scale = Math.min(scaleX, scaleY);

      img.set({
        originX: 'center',
        originY: 'center',
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        scaleX: scale,
        scaleY: scale,
        selectable: false,
      });

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });
  }, [canvas, imageUrl]);

  return canvas;
};