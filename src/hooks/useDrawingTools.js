import { useCallback, useState,useEffect } from 'react';
import { fabric } from 'fabric';

export const useDrawingTools = (canvas) => {
  const [drawingMode, setDrawingMode] = useState(null);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [isDrawingRect, setIsDrawingRect] = useState(false);
  const [rectStartPoint, setRectStartPoint] = useState(null);
  const [currentRect, setCurrentRect] = useState(null);
  const [currentCircle, setCurrentCircle] = useState(null);
  const [isPlacingCircle, setIsPlacingCircle] = useState(false);


     // Clean up all temporary drawing objects
  const cleanUpDrawing = useCallback(() => {
    if (!canvas) return;

    // Remove temporary polygon lines and points
    if (drawingMode === 'polygon') {
      canvas.getObjects().forEach((obj) => {
        if (obj.type === 'line' || (obj.type === 'circle' && obj.radius === 5)) {
          canvas.remove(obj);
        }
      });
      setPolygonPoints([]);
    }
    
    // Remove unfinished rectangle
    if (drawingMode === 'rectangle' && currentRect) {
      canvas.remove(currentRect);
      setCurrentRect(null);
    }
    
    // Remove unfinished circle
    if (drawingMode === 'circle' &&  isPlacingCircle && currentCircle) {
      canvas.remove(currentCircle);
      setCurrentCircle(null);
    }

    setIsDrawingRect(false);
    setIsPlacingCircle(false);
    setRectStartPoint(null);
    setDrawingMode(null);
    canvas.renderAll();
  }, [canvas, drawingMode, currentRect, isPlacingCircle, currentCircle]);

   
// Handle ESC key press
useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' &&  (drawingMode || isPlacingCircle)) {
        cleanUpDrawing();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawingMode, cleanUpDrawing, isPlacingCircle]);

    // Draw a circle at the specified coordinates
  const drawCircle = useCallback((x, y) => {
    if (!canvas) return;
   // Create preview circle
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
  
  setCurrentCircle(circle);
  canvas.add(circle);
  setIsPlacingCircle(true);
  canvas.renderAll();
  }, [canvas]);

  const finalizeCircle = useCallback(() => {
    setIsPlacingCircle(false);
    setCurrentCircle(null);
    setDrawingMode(null);
  }, []);
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
    if (!canvas || (!drawingMode && !isPlacingCircle)) return;

    const pointer = canvas.getPointer(e.e);

    if (drawingMode === 'circle' || isPlacingCircle) {
        if (!isPlacingCircle) {
          // First click - create preview circle
          drawCircle(pointer.x, pointer.y);
        } else {
          // Second click - finalize placement
          finalizeCircle();
        }
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
  }, [canvas, drawingMode, isPlacingCircle, drawCircle, finalizeCircle, handlePolygonClick, isDrawingRect, drawRectangle]);

  return {
    drawingMode,
    setDrawingMode,
    polygonPoints,
    isDrawingRect,
    handleCanvasClick,
    handleMouseMove,
    completePolygon,
    cancelPolygon,
    cleanUpDrawing, 
    isPlacingCircle,
  };
};