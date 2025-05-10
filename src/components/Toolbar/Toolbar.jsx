import React from "react";

const Toolbar = ({
  imageUrl,
  isEditable,
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
            <h3>Drawing</h3>
            <button
                onClick={() => setDrawingMode("circle")}
                disabled={!imageUrl || !isEditable}
                className={`toolbar-button ${
                    drawingMode === "circle" ? "active" : ""
                }`}
            >
                Draw Circle
            </button>
            <button
                onClick={() => setDrawingMode("rectangle")}
                disabled={!imageUrl || !isEditable}
                className={`toolbar-button ${
                    drawingMode === "rectangle" ? "active" : ""
                }`}
            >
                Draw Rectangle
            </button>
            {/* Nodule Button (Red) */}
            <button
                onClick={() => {
                    setDrawingMode("polygon");
                    setDrawingType("nodule");
                }}
                disabled={!imageUrl || !isEditable}
                className={`toolbar-button ${
                    drawingType === "nodule" ? "active" : ""
                }`}
                style={{
                    borderLeft: drawingType === "nodule" ? "3px solid red" : "",
                }}
            >
                Add Nodule
            </button>

            {/* Strap Kasi Button (Blue) */}
            <button
                onClick={() => {
                    setDrawingMode("polygon");
                    setDrawingType("strap-kasi");
                }}
                disabled={!imageUrl || !isEditable}
                className={`toolbar-button ${
                    drawingType === "strap-kasi" ? "active" : ""
                }`}
                style={{
                    borderLeft: drawingType === "strap-kasi" ? "3px solid blue" : "",
                }}
            >
                Strap Kasi
            </button>

            {/* Zemin Parenkim Button (Purple) */}
            <button
                onClick={() => {
                    setDrawingMode("polygon");
                    setDrawingType("zemin-parenkim");
                }}
                disabled={!imageUrl || !isEditable}
                className={`toolbar-button ${
                    drawingType === "zemin-parenkim" ? "active" : ""
                }`}
                style={{
                    borderLeft:
                        drawingType === "zemin-parenkim" ? "3px solid purple" : "",
                }}
            >
                Zemin Parenkim
            </button>

            {drawingMode === "rectangle" && (
                <div className="instruction">
                    Click and drag to draw | ESC to cancel
                </div>
            )}

            {drawingMode === "circle" && !isPlacingCircle && (
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
            <div className="toolbar-section">
            <h3>File</h3>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={!isEditable}
                className="toolbar-button"
            />
            <button
                onClick={handleImageReset}
                disabled={!imageUrl || !isEditable}
                className="toolbar-button"
            >
                Reset Image
            </button>
            <button
                onClick={handleImageDownload}
                disabled={!imageUrl || !isEditable}
                className="toolbar-button"
            >
                Download
            </button>
            <button
                onClick={handleImageSave}
                disabled={!imageUrl || !isEditable}
                className="toolbar-button"
            >
                Save
            </button>
        </div>

        <div className="toolbar-section">
            <h3>Edit</h3>
            <button
                onClick={handleImageClear}
                disabled={!imageUrl || !isEditable}
                className="toolbar-button"
            >
                Clear Canvas
            </button>
            <button
                onClick={handleImageUndo}
                disabled={!imageUrl || !isEditable}
                className="toolbar-button"
            >
                Undo
            </button>
            <button
                onClick={handleImageRedo}
                disabled={!imageUrl || !isEditable}
                className="toolbar-button"
            >
                Redo
            </button>
        </div>
        <h3>Save/Load</h3>
            <button 
                onClick={saveCanvasState} 
                disabled={!isEditable}
                className="toolbar-button"
            >
                Save Annotations
            </button>
            <button 
                onClick={loadSavedState} 
                disabled={!isEditable}
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
                disabled={!imageUrl || !isEditable}
                className="toolbar-button"
            >
                Zoom In
            </button>
            <button
                onClick={handleImageZoomOut}
                disabled={!imageUrl || !isEditable}
                className="toolbar-button"
            >
                Zoom Out
            </button>
            <button
                onClick={handleImagePanStart}
                disabled={!imageUrl || !isEditable}
                className="toolbar-button"
            >
                Pan
            </button>
            <button
                onClick={handleImagePanEnd}
                disabled={!imageUrl || !isEditable}
                className="toolbar-button"
            >
                Stop Pan
            </button>
            <button
                onClick={handleImagePanReset}
                disabled={!imageUrl || !isEditable}
                className="toolbar-button"
            >
                Reset View
            </button>
        </div>

     
    </div>
);
};

export default Toolbar;
