import { useRef, useState, useEffect } from "react";
import { fabric } from "fabric";

export default function useFabric() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  // Initialize the Fabric.js canvas
  const initCanvas = () => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      selection: true,
      isDrawingMode: false,
    });
    setCanvas(fabricCanvas);
  };

  // Toggle drawing mode
  const setDrawingMode = (mode) => {
    if (canvas) {
      canvas.isDrawingMode = mode === "draw";
      canvas.freeDrawingBrush.color = mode === "draw" ? "black" : "transparent";
      canvas.freeDrawingBrush.width = 5;
    }
  };

  // Add shapes to the canvas
  const addShape = (shapeType, color) => {
    if (!canvas) return;
    
    let shape = null;
    const options = {
      left: 100,
      top: 100,
      fill: "transparent",
      stroke: color || "black",
      strokeWidth: 2,
    };

    switch (shapeType) {
      case "rectangle":
        shape = new fabric.Rect({
          ...options,
          width: 100,
          height: 60,
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          ...options,
          radius: 50,
        });
        break;
      case "polygon":
        shape = new fabric.Polygon(
          [
            { x: 200, y: 10 },
            { x: 250, y: 50 },
            { x: 220, y: 100 },
            { x: 180, y: 100 },
            { x: 150, y: 50 },
          ],
          {
            ...options,
            left: 100,
            top: 100,
          }
        );
        break;
      default:
        return;
    }

    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.renderAll();
  };

  // Select or deselect an object
  const toggleSelection = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.discardActiveObject();
    } else {
      // You can implement additional logic for selection/deselection here
    }
    canvas.renderAll();
  };

  useEffect(() => {
    initCanvas();
    // Cleanup when component unmounts
    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, []);

  return {
    canvasRef,
    addShape,
    setDrawingMode,
    toggleSelection,
  };
}
