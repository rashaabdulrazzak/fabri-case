import React, { useRef, useState } from 'react';

import { useDrawingTools } from '../hooks/useDrawingTools';
import { useCanvasActions } from "../hooks/useCanvasActions";
import { useFabricCanvas } from '../hooks/useFabricCanvas';
import Toolbar from './Toolbar/Toolbar';
import './FabricDrawing.css';

const FabricDrawing = () => {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(
    'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'
  );

  // Initialize canvas and load image
  const canvas = useFabricCanvas(canvasRef, imageUrl);

  // Drawing tools functionality
  const {
    drawingMode,
    setDrawingMode,
    polygonPoints,
    isDrawingRect,
    handleCanvasClick,
    handleMouseMove,
    completePolygon,
    drawingType,
    setDrawingType,
    
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

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
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
  React.useEffect(() => {
    if (!canvas) return;

    canvas.on('mouse:down', handleCanvasClick);
    canvas.on('mouse:move', handleMouseMove);
    
    // Handle zoom
    canvas.on('mouse:wheel', (opt) => {
      const delta = opt.e.deltaY;
      const zoom = canvas.getZoom();
      const newZoom = zoom - delta / 200;
      canvas.setZoom(newZoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });
    
    // Handle pan
    let isDragging = false;
    let lastPosX;
    let lastPosY;
    
    canvas.on('mouse:down', (opt) => {
      if (opt.e.altKey === true) {
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
      canvas.off('mouse:down', handleCanvasClick);
      canvas.off('mouse:move', handleMouseMove);
    };
  }, [canvas, handleCanvasClick, handleMouseMove]);

  return (
    <div className="fabric-drawing-container">
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