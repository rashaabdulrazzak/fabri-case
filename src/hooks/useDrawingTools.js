import { useCallback, useState,useEffect } from 'react';
import { fabric } from 'fabric';

export const useDrawingTools = (canvas) => {
  const [drawingMode, setDrawingMode] = useState(null);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [isDrawingRect, setIsDrawingRect] = useState(false);
  const [rectStartPoint, setRectStartPoint] = useState(null);
  const [currentRect, setCurrentRect] = useState(null);

    // Add ESC key handler for canceling drawing
    useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.key === 'Escape') {
            if (drawingMode === 'polygon' && polygonPoints.length > 0) {
              cancelPolygon();
            } else if (drawingMode === 'rectangle' && isDrawingRect) {
              cancelRectangle();
            } else {
              setDrawingMode(null);
            }
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [drawingMode, polygonPoints, isDrawingRect]);
  const drawCircle = useCallback((x, y) => {
    if (!canvas) return;
    
    const circle = new fabric.Circle({
      radius: 30,
      fill: 'transparent',
      stroke: 'red',
      strokeWidth: 2,
      left: x - 30,
      top: y - 30,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });
    canvas.add(circle);
    canvas.renderAll();
  }, [canvas]);

  const drawRectangle = useCallback((x, y, width, height) => {
    if (!canvas) return null;
    
    const rect = new fabric.Rect({
      left: x,
      top: y,
      width: width,
      height: height,
      fill: 'transparent',
      stroke: 'green',
      strokeWidth: 2,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });
    
    canvas.add(rect);
    return rect;
  }, [canvas]);
  const cancelRectangle = useCallback(() => {
    if (!canvas || !currentRect) return;
    
    canvas.remove(currentRect);
    setIsDrawingRect(false);
    setRectStartPoint(null);
    setCurrentRect(null);
    setDrawingMode(null);
    canvas.renderAll();
  }, [canvas, currentRect]);
  const handlePolygonClick = useCallback((x, y) => {
    if (!canvas) return;
    
    setPolygonPoints((prevPoints) => {
      const updatedPoints = [...prevPoints, { x, y }];

      if (prevPoints.length > 0) {
        const lastPoint = prevPoints[prevPoints.length - 1];
        const line = new fabric.Line([lastPoint.x, lastPoint.y, x, y], {
          stroke: 'blue',
          strokeWidth: 2,
          selectable: false,
        });
        canvas.add(line);
      }

      const point = new fabric.Circle({
        radius: 5,
        fill: 'blue',
        left: x - 5,
        top: y - 5,
        selectable: false,
      });
      canvas.add(point);

      return updatedPoints;
    });
  }, [canvas]);
  const cancelPolygon = useCallback(() => {
    if (!canvas) return;
    
    canvas.getObjects().forEach((obj) => {
      if (obj.type === 'line' || (obj.type === 'circle' && obj.radius === 5)) {
        canvas.remove(obj);
      }
    });
    setPolygonPoints([]);
    setDrawingMode(null);
    canvas.renderAll();
  }, [canvas]);

  const completePolygon = useCallback(() => {
    if (!canvas || polygonPoints.length < 3) {
      alert('A polygon needs at least 3 points');
      return;
    }

    const polygon = new fabric.Polygon(polygonPoints, {
      fill: 'rgba(0, 0, 255, 0.2)',
      stroke: 'blue',
      strokeWidth: 2,
      selectable: true,
    });

    canvas.add(polygon);

    // Remove temporary lines and small circles
    canvas.getObjects().forEach((obj) => {
      if (obj.type === 'line' || (obj.type === 'circle' && obj.radius === 5)) {
        canvas.remove(obj);
      }
    });

    setPolygonPoints([]);
    setDrawingMode(null);
    canvas.renderAll();
  }, [canvas, polygonPoints]);


  const handleMouseMove = useCallback((e) => {
    if (!canvas || !isDrawingRect || !rectStartPoint || !currentRect) return;

    const pointer = canvas.getPointer(e.e);
    const startX = rectStartPoint.x;
    const startY = rectStartPoint.y;
    
    const width = pointer.x - startX;
    const height = pointer.y - startY;
    
    currentRect.set({
      width: Math.abs(width),
      height: Math.abs(height),
      left: width > 0 ? startX : pointer.x,
      top: height > 0 ? startY : pointer.y,
    });
    
    canvas.renderAll();
  }, [canvas, isDrawingRect, rectStartPoint, currentRect]);

  const handleCanvasClick = useCallback((e) => {
    if (!canvas || !drawingMode) return;

    const pointer = canvas.getPointer(e.e);

    if (drawingMode === 'circle') {
      drawCircle(pointer.x, pointer.y);
      setDrawingMode(null);
    } else if (drawingMode === 'polygon') {
      handlePolygonClick(pointer.x, pointer.y);
    } else if (drawingMode === 'rectangle') {
      if (!isDrawingRect) {
        setIsDrawingRect(true);
        setRectStartPoint(pointer);
        const rect = drawRectangle(pointer.x, pointer.y, 1, 1);
        setCurrentRect(rect);
      } else {
        setIsDrawingRect(false);
        setRectStartPoint(null);
        setCurrentRect(null);
        setDrawingMode(null);
      }
    }
  }, [canvas, drawingMode, drawCircle, handlePolygonClick, isDrawingRect, drawRectangle]);

  return {
    drawingMode,
    setDrawingMode,
    polygonPoints,
    isDrawingRect,
    handleCanvasClick,
    handleMouseMove,
    completePolygon,
    cancelPolygon,
  };
};