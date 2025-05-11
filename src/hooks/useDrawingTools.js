import { useCallback, useState, useEffect } from 'react';
import { fabric } from 'fabric';

export const useDrawingTools = (canvas,isEditable) => {
  const [drawingMode, setDrawingMode] = useState(null);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [isDrawingRect, setIsDrawingRect] = useState(false);
  const [rectStartPoint, setRectStartPoint] = useState(null);
  const [currentRect, setCurrentRect] = useState(null);
  const [currentCircle, setCurrentCircle] = useState(null);
  const [isPlacingCircle, setIsPlacingCircle] = useState(false);
  const [drawingType, setDrawingType] = useState(null); // 'nodule', 'strap-kasi', 'zemin-parenkim'

  const getDrawingStyle = (type) => {
    switch(type) {
      case 'strap-kasi':
        return {
          fill: 'rgba(0, 0, 255, 0.2)', // Blue
          stroke: 'blue',
          pointColor: 'blue',
          lineColor: 'blue'
        };
      case 'zemin-parenkim':
        return {
          fill: 'rgba(128, 0, 128, 0.2)', // Purple
          stroke: 'purple',
          pointColor: 'purple',
          lineColor: 'purple'
        };
      case 'nodule':
      default:
        return {
          fill: 'rgba(255, 0, 0, 0.2)', // Red
          stroke: 'red',
          pointColor: 'red',
          lineColor: 'red'
        };
    }
  };


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
    if (drawingMode === 'circle' && isPlacingCircle && currentCircle) {
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
      if (e.key === 'Escape' && (drawingMode || isPlacingCircle)) {
        cleanUpDrawing();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [drawingMode, cleanUpDrawing, isPlacingCircle]);

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
      dataType: 'circle' // Custom data attribute
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
       dataType: 'rectangle'
    });
    
    canvas.add(rect);
    return rect;
  }, [canvas]);
 
  function enablePolygonEditing(polygon, canvas) {
    polygon.edit = true;
  
    polygon.objectCaching = false;
    polygon.hasBorders = false;
    polygon.cornerStyle = 'circle';
  
    polygon.controls = polygon.points.reduce((acc, point, index) => {
      acc[`p${index}`] = new fabric.Control({
        positionHandler: function(dim, finalMatrix, fabricObject) {
          const x = fabricObject.points[index].x - fabricObject.pathOffset.x;
          const y = fabricObject.points[index].y - fabricObject.pathOffset.y;
          return fabric.util.transformPoint(
            { x, y },
            fabric.util.multiplyTransformMatrices(
              fabricObject.canvas.viewportTransform,
              fabricObject.calcTransformMatrix()
            )
          );
        },
        actionHandler: function(eventData, transform, x, y) {
          const polygon = transform.target;
          const currentControl = polygon.controls[`p${index}`];
          const mouseLocal = polygon.toLocalPoint(
            new fabric.Point(x, y),
            'center',
            'center'
          );
          polygon.points[index].x = mouseLocal.x + polygon.pathOffset.x;
          polygon.points[index].y = mouseLocal.y + polygon.pathOffset.y;
          return true;
        },
        actionName: 'modifyPolygon',
        pointIndex: index,
        cursorStyle: 'pointer'
      });
      return acc;
    }, {});
  
    polygon.setCoords();
    canvas.requestRenderAll();
  }
  // Utility to extract polygon data
const savePolygonData = (polygon) => {
    const updatedPoints = polygon.points.map(p => ({ x: p.x, y: p.y }));
    console.log('Auto-saving polygon data:', updatedPoints);
  
    // You can send this to a server or store it in state
  };
    // Make the polygon editable
    useEffect(() => {
        if (!canvas) return;
        canvas.on('object:added', (e) => {
          const obj = e.target;
          if (obj.type === 'polygon') {
            enablePolygonEditing(obj, canvas);
          }
        }
        );
        canvas.on('object:modified', (e) => {
          const obj = e.target;
          if (obj.type === 'polygon') {
            enablePolygonEditing(obj, canvas);
          }
        }
        );

        return () => {
          canvas.off('object:added');
          canvas.off('object:modified');
        }
      }
      , [canvas]);
  // Complete the polygon drawing  

  
  function disablePolygonEditing(polygon, canvas) {
    polygon.edit = false;
    polygon.controls = fabric.Object.prototype.controls;
    canvas.requestRenderAll();
  }
  

  
  // Make the polygon editable
  useEffect(() => {
    if (!canvas) return;
  
    // When a polygon is added or modified, enable editing
    const handleAddOrModify = (e) => {
      const obj = e.target;
      if (obj.type === 'polygon') {
        enablePolygonEditing(obj, canvas);
      }
    };
  
    // Auto-save when a polygon is modified
    const handleModified = (e) => {
      const obj = e.target;
      if (obj.type === 'polygon') {
        savePolygonData(obj);
      }
    };
  
    // Auto-save on deselect (blur)
    const handleDeselection = () => {
      canvas.getObjects().forEach(obj => {
        if (obj.type === 'polygon' && obj.edit) {
          savePolygonData(obj);
        }
      });
    };
  
    canvas.on('object:added', handleAddOrModify);
    canvas.on('object:modified', handleModified);
    canvas.on('selection:cleared', handleDeselection);
  
    return () => {
      canvas.off('object:added', handleAddOrModify);
      canvas.off('object:modified', handleModified);
      canvas.off('selection:cleared', handleDeselection);
    };
  }, [canvas]);
  
  const completePolygon = useCallback(() => {
    if (!canvas || polygonPoints.length < 3 || !drawingType) {
      alert('A shape needs at least 3 points');
      return;
    }
  
    const style = getDrawingStyle(drawingType);
  
    const polygon = new fabric.Polygon(polygonPoints, {
      fill: style.fill,
      stroke: style.stroke,
      strokeWidth: 2,
      selectable: true,
      dataType: drawingType,
      properties: {},
    });
  
    // Remove temporary lines and points
    canvas.getObjects().forEach((obj) => {
      if (obj.type === 'line' || (obj.type === 'circle' && obj.radius === 5)) {
        canvas.remove(obj);
      }
    });
  
    canvas.add(polygon);
    enablePolygonEditing(polygon, canvas);
  
    setPolygonPoints([]);
    setDrawingType(null);
    setDrawingMode(null);
    canvas.renderAll();
  }, [canvas, polygonPoints, drawingType]);
  
  function disablePolygonEditing(polygon, canvas) {
    polygon.edit = false;
    polygon.controls = fabric.Object.prototype.controls;
    canvas.requestRenderAll();
  }
  
  const handlePolygonClick = useCallback((x, y) => {
    const newPoint = { x, y };
  
    if (polygonPoints.length > 0) {
      const firstPoint = polygonPoints[0];
      const distance = Math.hypot(firstPoint.x - x, firstPoint.y - y);
  
      if (distance < 10) {
        completePolygon();
        return;
      }
    }
  
    if (polygonPoints.length > 0) {
      const prevPoint = polygonPoints[polygonPoints.length - 1];
      const line = new fabric.Line([prevPoint.x, prevPoint.y, x, y], {
        stroke: 'red',
        selectable: false,
      });
      canvas.add(line);
    }
  
    setPolygonPoints(prev => [...prev, newPoint]);
  }, [canvas, polygonPoints, completePolygon]);
  
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
  
  const handleMouseDown = useCallback((e) => {
  if (!canvas || drawingMode !== 'rectangle') return;

  const pointer = canvas.getPointer(e.e);
  const startX = pointer.x;
  const startY = pointer.y;

  const rect = drawRectangle(startX, startY, 1, 1);
  setRectStartPoint({ x: startX, y: startY });
  setCurrentRect(rect);
  setIsDrawingRect(true);
}, [canvas, drawingMode, drawRectangle]);

  const handleCanvasClick = useCallback((e) => {
    if (!canvas || (!drawingMode && !isPlacingCircle)) return;

    const pointer = canvas.getPointer(e.e);

    if (drawingMode === 'circle' || isPlacingCircle) {
      if (!isPlacingCircle) {
        drawCircle(pointer.x, pointer.y);
      } else {
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
useEffect(() => {
  if (!canvas || isEditable) return;

  const handleMouseDown = (e) => e.e.preventDefault(); // Disable drawing clicks
  canvas.on('mouse:down', handleMouseDown);

  return () => {
    canvas.off('mouse:down', handleMouseDown);
  };
}, [canvas, isEditable]);

  return {
    drawingMode,
    setDrawingMode,
    polygonPoints,
    isDrawingRect,
    handleCanvasClick,
    handleMouseMove,
    completePolygon,
    cleanUpDrawing,
    isPlacingCircle,
     drawingType,
  setDrawingType,
  };
};