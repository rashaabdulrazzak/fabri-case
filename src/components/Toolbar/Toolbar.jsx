import React from "react";

const Toolbar = ({
  imageUrl,
  drawingMode,
  setDrawingMode,
  completePolygon,
  handleImageUpload,
  handleImageReset,
  handleImageDownload,
  handleImageClear,
  handleImageSave,
  handleImageUndo,
  handleImageRedo,
  handleImageZoomIn,
  handleImageZoomOut,
  handleImagePanStart,
  handleImagePanEnd,
  handleImagePanReset,
  handleImagePanCancel,
  isPlacingCircle,
  drawingType,
  setDrawingType,
  saveCanvasState,
  loadSavedState,
}) => {
  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <h3>File</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="toolbar-button"
        />
        <button
          onClick={handleImageReset}
          disabled={!imageUrl}
          className="toolbar-button"
        >
          Reset Image
        </button>
        <button
          onClick={handleImageDownload}
          disabled={!imageUrl}
          className="toolbar-button"
        >
          Download
        </button>
        <button
          onClick={handleImageSave}
          disabled={!imageUrl}
          className="toolbar-button"
        >
          Save
        </button>
      </div>

      <div className="toolbar-section">
        <h3>Edit</h3>
        <button
          onClick={handleImageClear}
          disabled={!imageUrl}
          className="toolbar-button"
        >
          Clear Canvas
        </button>
        <button
          onClick={handleImageUndo}
          disabled={!imageUrl}
          className="toolbar-button"
        >
          Undo
        </button>
        <button
          onClick={handleImageRedo}
          disabled={!imageUrl}
          className="toolbar-button"
        >
          Redo
        </button>
      </div>
      <h3>Save/Load</h3>
        <button 
          onClick={saveCanvasState} 
          className="toolbar-button"
        >
          Save Annotations
        </button>
        <button 
          onClick={loadSavedState} 
          className="toolbar-button"
        >
          Load Annotations
        </button>
        <div className="instruction">
          Save/Load with current image
        </div>
      <div className="toolbar-section">
        <h3>View</h3>
        <button
          onClick={handleImageZoomIn}
          disabled={!imageUrl}
          className="toolbar-button"
        >
          Zoom In
        </button>
        <button
          onClick={handleImageZoomOut}
          disabled={!imageUrl}
          className="toolbar-button"
        >
          Zoom Out
        </button>
        <button
          onClick={handleImagePanStart}
          disabled={!imageUrl}
          className="toolbar-button"
        >
          Pan
        </button>
        <button
          onClick={handleImagePanEnd}
          disabled={!imageUrl}
          className="toolbar-button"
        >
          Stop Pan
        </button>
        <button
          onClick={handleImagePanReset}
          disabled={!imageUrl}
          className="toolbar-button"
        >
          Reset View
        </button>
      </div>

      <div className="toolbar-section">
        <h3>Drawing</h3>
        <button
          onClick={() => setDrawingMode("circle")}
          disabled={!imageUrl}
          className={`toolbar-button ${
            drawingMode === "circle" ? "active" : ""
          }`}
        >
          Draw Circle
        </button>
        <button
          onClick={() => setDrawingMode("rectangle")}
          disabled={!imageUrl}
          className={`toolbar-button ${
            drawingMode === "rectangle" ? "active" : ""
          }`}
        >
          Draw Rectangle
        </button>
  {/* Nodule Button (Red) */}
  <button
          onClick={() => {
            setDrawingMode('polygon');
            setDrawingType('nodule');
          }}
          disabled={!imageUrl}
          className={`toolbar-button ${drawingType === 'nodule' ? 'active' : ''}`}
          style={{ borderLeft: drawingType === 'nodule' ? '3px solid red' : '' }}
        >
          Add Nodule
        </button>
        
        {/* Strap Kasi Button (Blue) */}
        <button
          onClick={() => {
            setDrawingMode('polygon');
            setDrawingType('strap-kasi');
          }}
          disabled={!imageUrl}
          className={`toolbar-button ${drawingType === 'strap-kasi' ? 'active' : ''}`}
          style={{ borderLeft: drawingType === 'strap-kasi' ? '3px solid blue' : '' }}
        >
          Strap Kasi
        </button>
        
        {/* Zemin Parenkim Button (Purple) */}
        <button
          onClick={() => {
            setDrawingMode('polygon');
            setDrawingType('zemin-parenkim');
          }}
          disabled={!imageUrl}
          className={`toolbar-button ${drawingType === 'zemin-parenkim' ? 'active' : ''}`}
          style={{ borderLeft: drawingType === 'zemin-parenkim' ? '3px solid purple' : '' }}
        >
          Zemin Parenkim
        </button>
        
        {drawingMode === 'polygon' && (
          <div className="polygon-controls">
            <button onClick={completePolygon} className="toolbar-button">
              Complete {drawingType === 'nodule' ? 'Nodule' : 
                      drawingType === 'strap-kasi' ? 'Strap Kasi' : 'Zemin Parenkim'}
            </button>
            <div className="instruction">
              Click to add points | ESC to cancel
            </div>
          </div>
        )}


{drawingMode === 'rectangle' && (
  <div className="instruction">
    Click and drag to draw | ESC to cancel
  </div>
)}

{drawingMode === 'circle' && !isPlacingCircle && (
  <div className="instruction">
    Click to start placing circle | ESC to cancel
  </div>
)}

{isPlacingCircle && (
  <div className="instruction">
    Click to place circle | ESC to cancel
  </div>
)}

      </div>
    </div>
  );
};

export default Toolbar;
