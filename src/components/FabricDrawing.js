import React, { useRef, useState, useEffect } from 'react';
import { useDrawingTools } from '../hooks/useDrawingTools';
import { useCanvasActions } from "../hooks/useCanvasActions";
import { useFabricCanvas } from '../hooks/useFabricCanvas';
import { useCanvasState } from '../hooks/useCanvasState';
import ShapeInventory from './ShapeInventory/ShapeInventory';

import Toolbar from './Toolbar/Toolbar';
import './FabricDrawing.css';

const FabricDrawing = () => {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(
    'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'
  );

  // Initialize canvas and load image
  const canvas = useFabricCanvas(canvasRef, imageUrl);
  
  // State management hook (should be the only one handling save/load)
  const {
    saveToLocalStorage,
    loadFromLocalStorage
  } = useCanvasState(canvas, ['dataType', 'properties', 'id'],imageUrl, setImageUrl);

  // Drawing tools functionality
  const {
    drawingMode,
    setDrawingMode,
    drawingType,
    setDrawingType,
    polygonPoints,
    isDrawingRect,
    handleCanvasClick,
    handleMouseMove,
    completePolygon,
    cleanUpDrawing,
    isPlacingCircle,
  } = useDrawingTools(canvas);

  // Canvas actions
  const {
    handleImageZoomIn,
    handleImageZoomOut,
    handleImagePanStart,
    handleImagePanEnd,
    handleImagePanReset,
    handleImageClear,
    handleImageUndo,
    handleImageDownload,
  } = useCanvasActions(canvas);

  // State to trigger inventory updates
  const [inventoryVersion, setInventoryVersion] = useState(0);

  // Function to force inventory update
  const updateInventory = () => setInventoryVersion(v => v + 1);

  // Update inventory when canvas changes
  useEffect(() => {
    if (!canvas) return;

    const handleUpdate = () => updateInventory();
    
    canvas.on('object:added', handleUpdate);
    canvas.on('object:removed', handleUpdate);
    canvas.on('object:modified', handleUpdate);

    return () => {
      canvas.off('object:added', handleUpdate);
      canvas.off('object:removed', handleUpdate);
      canvas.off('object:modified', handleUpdate);
    };
  }, [canvas]);


  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
        // Clear existing annotations when new image is loaded
        handleImageClear(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageReset = () => {
    setImageUrl(null);
    if (canvas) {
      canvas.setBackgroundImage(null, canvas.renderAll.bind(canvas));
    }
  };

  const handleImageSave = () => {
    handleImageDownload();
  };

  // Set up event listeners
  useEffect(() => {
    if (!canvas) return;

    const eventHandlers = {
      'mouse:down': handleCanvasClick,
      'mouse:move': handleMouseMove,
      'mouse:wheel': (opt) => {
        const delta = opt.e.deltaY;
        const zoom = canvas.getZoom();
        const newZoom = zoom - delta / 200;
        canvas.setZoom(newZoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      }
    };

    // Add all event listeners
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      canvas.on(event, handler);
    });

    // Pan handling
    let isDragging = false;
    let lastPosX, lastPosY;

    canvas.on('mouse:down', (opt) => {
      if (opt.e.altKey) {
        isDragging = true;
        lastPosX = opt.e.clientX;
        lastPosY = opt.e.clientY;
      }
    });

    canvas.on('mouse:move', (opt) => {
      if (isDragging) {
        const e = opt.e;
        const vpt = canvas.viewportTransform;
        vpt[4] += e.clientX - lastPosX;
        vpt[5] += e.clientY - lastPosY;
        canvas.requestRenderAll();
        lastPosX = e.clientX;
        lastPosY = e.clientY;
      }
    });

    canvas.on('mouse:up', () => {
      isDragging = false;
    });

    return () => {
      // Remove all event listeners
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        canvas.off(event, handler);
      });
    };
  }, [canvas, handleCanvasClick, handleMouseMove]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && canvas) {
        const activeObj = canvas.getActiveObject();
        if (activeObj) {
          const highlightId = (obj) => obj.get('highlightId') === highlightId;
  
          canvas.remove(activeObj);
  
          if (highlightId) {
           const toRemove = canvas.getObjects().filter(
              (obj) => obj.get && obj.get('highlightId') === highlightId
            );
  
            console.log('Found for removal:', toRemove); // ✅ Debug check
  
            toRemove.forEach((obj) => canvas.remove(obj));
          }
  
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canvas]);
  
  
  
  
  // Load saved state on initial render
  useEffect(() => {
    loadFromLocalStorage();
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="fabric-drawing-container">
         <ShapeInventory canvas={canvas} key={inventoryVersion} />
      <Toolbar
        imageUrl={imageUrl}
        drawingMode={drawingMode}
        setDrawingMode={setDrawingMode}
        drawingType={drawingType}
        setDrawingType={setDrawingType}
        completePolygon={completePolygon}
        handleImageUpload={handleImageUpload}
        handleImageReset={handleImageReset}
        handleImageDownload={handleImageDownload}
        handleImageClear={() => handleImageClear(imageUrl)}
        handleImageSave={handleImageSave}
        handleImageUndo={handleImageUndo}
        handleImageZoomIn={handleImageZoomIn}
        handleImageZoomOut={handleImageZoomOut}
        handleImagePanStart={handleImagePanStart}
        handleImagePanEnd={handleImagePanEnd}
        handleImagePanReset={handleImagePanReset}
        saveCanvasState={saveToLocalStorage}
        loadSavedState={loadFromLocalStorage}
      />
      
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
        />
      </div>
    </div>
  );
};

export default FabricDrawing;