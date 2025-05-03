import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { fabric } from 'fabric';

const FabricCanvas = forwardRef((props, ref) => {
  const canvasEl = useRef(null);
  const fabricCanvas = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current, {
      isDrawingMode: true,
      backgroundColor: '#fff',
      width: 800,
      height: 600,
    });

    canvas.freeDrawingBrush.color = 'black';
    canvas.freeDrawingBrush.width = 5;

    fabricCanvas.current = canvas;

    return () => canvas.dispose();
  }, []);

  // Expose functions to parent through ref
  useImperativeHandle(ref, () => ({
    setDrawingMode: (enabled) => {
      if (fabricCanvas.current) {
        fabricCanvas.current.isDrawingMode = enabled;
      }
    },
    setBrushColor: (color) => {
      if (fabricCanvas.current) {
        fabricCanvas.current.freeDrawingBrush.color = color;
      }
    },
    setBrushSize: (size) => {
      if (fabricCanvas.current) {
        fabricCanvas.current.freeDrawingBrush.width = size;
      }
    },
    clearCanvas: () => {
      if (fabricCanvas.current) {
        fabricCanvas.current.clear();
        fabricCanvas.current.backgroundColor = '#fff';
        fabricCanvas.current.renderAll();
      }
    },
    saveCanvas: () => {
      return fabricCanvas.current?.toDataURL({ format: 'png' });
    },
  }));

  return <canvas ref={canvasEl} />;
});

export default FabricCanvas;
