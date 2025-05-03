import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import './FabricDrawing.css';

const FabricFreeDraw = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);

  // Initialize canvas
  useEffect(() => {
    const canvasInstance = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: false, // We'll handle drawing manually
      selection: false,
      backgroundColor: '#f0f0f0'
    });

    setCanvas(canvasInstance);

    return () => {
      canvasInstance.dispose();
    };
  }, []);

  // Set up drawing handlers
  useEffect(() => {
    if (!canvas) return;

    let currentPath = null;

    const handleMouseDown = (e) => {
      if (!e.absolutePointer) return;
      
      setIsDrawing(true);
      const pointer = e.absolutePointer;
      
      currentPath = new fabric.Path(`M ${pointer.x} ${pointer.y}`, {
        stroke: brushColor,
        strokeWidth: brushSize,
        fill: '',
        strokeLineCap: 'round',
        strokeLineJoin: 'round',
        selectable: false
      });
      
      canvas.add(currentPath);
    };

    const handleMouseMove = (e) => {
      if (!isDrawing || !currentPath || !e.absolutePointer) return;
      
      const pointer = e.absolutePointer;
      const pathData = currentPath.path;
      
      pathData.push(['L', pointer.x, pointer.y]);
      currentPath.set({ path: pathData });
      canvas.requestRenderAll();
    };

    const handleMouseUp = () => {
      if (currentPath) {
        // Make the path selectable after creation
        currentPath.set({
          selectable: true,
          evented: true
        });
      }
      setIsDrawing(false);
      currentPath = null;
    };

    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
    };
  }, [canvas, isDrawing, brushColor, brushSize]);

  const clearCanvas = () => {
    if (canvas) {
      canvas.clear();
    }
  };

  return (
    <div className="fabric-drawing-container">
      <div className="controls">
        <div>
          <label>Brush Color: </label>
          <input 
            type="color" 
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
          />
        </div>
        <div>
          <label>Brush Size: </label>
          <input 
            type="range" 
            min="1" 
            max="20" 
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
          />
          <span>{brushSize}px</span>
        </div>
        <button onClick={clearCanvas}>Clear Canvas</button>
      </div>
      
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ 
          border: '1px solid #ccc',
          cursor: 'crosshair'
        }}
      />
    </div>
  );
};

export default FabricFreeDraw;