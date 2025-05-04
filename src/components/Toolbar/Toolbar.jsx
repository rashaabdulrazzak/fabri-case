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
  isPlacingCircle
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
        <button
    onClick={() => setDrawingMode('polygon')}
    disabled={!imageUrl}
    className={`toolbar-button ${drawingMode === 'polygon' ? 'active' : ''}`}
  >
    Add Nodule
  </button>

  {drawingMode === 'polygon' && (
    <div className="polygon-controls">
      <button onClick={completePolygon} className="toolbar-button">
        Complete Nodule
      </button>
      <div className="instruction">
        Click to add nodule points | ESC to cancel
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
