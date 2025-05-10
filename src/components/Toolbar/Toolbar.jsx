import React from "react";
import { Menu, Tooltip } from "antd";
import {
  UploadOutlined,
  SaveOutlined,
  DownloadOutlined,
  DeleteOutlined,
  BorderOutlined,
  DotChartOutlined,
  EditOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  RedoOutlined,
  UndoOutlined,
  ArrowsAltOutlined,
  ShrinkOutlined,
  SaveFilled,
  FolderOpenFilled,
  BlockOutlined,
  HighlightOutlined,
  GatewayOutlined
} from "@ant-design/icons";

const { Item: MenuItem } = Menu;

export default function IconOnlyToolbar({
  imageUrl,
  isEditable,
  drawingMode,
  drawingType,
  setDrawingMode,
  setDrawingType,
  handleImageUpload,
  handleImageDownload,
  handleImageClear,
  handleImageSave,
  handleImageUndo,
  handleImageRedo,
  handleImageZoomIn,
  handleImageZoomOut,
  handleImagePanStart,
  handleImagePanReset,
  saveCanvasState,
  loadSavedState
}) {
  return (
    <Menu
      mode="inline"
      style={{ width: 48, height: '100%' }}
      className="icon-only-toolbar"
      selectable={false}
      inlineCollapsed={true}
    >


      {/* Drawing Tools */}
      <Tooltip title="Select/Move" placement="right">
        <MenuItem 
          key="select" 
          icon={<EditOutlined />}
          onClick={() => setDrawingMode("select")}
          disabled={!imageUrl || !isEditable}
          className={drawingMode === "select" ? "ant-menu-item-selected" : ""}
        />
      </Tooltip>

      <Tooltip title="Draw Circle" placement="right">
        <MenuItem 
          key="circle" 
          icon={<DotChartOutlined />}
          onClick={() => setDrawingMode("circle")}
          disabled={!imageUrl || !isEditable}
          className={drawingMode === "circle" ? "ant-menu-item-selected" : ""}
        />
      </Tooltip>

      <Tooltip title="Draw Rectangle" placement="right">
        <MenuItem 
          key="rectangle" 
          icon={<BorderOutlined />}
          onClick={() => setDrawingMode("rectangle")}
          disabled={!imageUrl || !isEditable}
          className={drawingMode === "rectangle" ? "ant-menu-item-selected" : ""}
        />
      </Tooltip>

      {/* Polygon Tools as Main Items */}
      <Tooltip title="Add Nodule (Red)" placement="right">
        <MenuItem 
          key="nodule" 
          icon={<BlockOutlined style={{ color: '#ff4d4f' }} />}
          onClick={() => {
            setDrawingMode("polygon");
            setDrawingType("nodule");
          }}
          disabled={!imageUrl || !isEditable}
          className={drawingType === "nodule" ? "ant-menu-item-selected" : ""}
        />
      </Tooltip>

      <Tooltip title="Strap Kasi (Blue)" placement="right">
        <MenuItem 
          key="strap-kasi" 
          icon={<HighlightOutlined style={{ color: '#1890ff' }} />}
          onClick={() => {
            setDrawingMode("polygon");
            setDrawingType("strap-kasi");
          }}
          disabled={!imageUrl || !isEditable}
          className={drawingType === "strap-kasi" ? "ant-menu-item-selected" : ""}
        />
      </Tooltip>

      <Tooltip title="Zemin Parenkim (Purple)" placement="right">
        <MenuItem 
          key="zemin-parenkim" 
          icon={<GatewayOutlined style={{ color: '#722ed1' }} />}
          onClick={() => {
            setDrawingMode("polygon");
            setDrawingType("zemin-parenkim");
          }}
          disabled={!imageUrl || !isEditable}
          className={drawingType === "zemin-parenkim" ? "ant-menu-item-selected" : ""}
        />
      </Tooltip>


      {/* Edit Tools */}
      <Tooltip title="Undo" placement="right">
        <MenuItem 
          key="undo" 
          icon={<UndoOutlined />}
          onClick={handleImageUndo}
          disabled={!imageUrl || !isEditable}
        />
      </Tooltip>

      <Tooltip title="Redo" placement="right">
        <MenuItem 
          key="redo" 
          icon={<RedoOutlined />}
          onClick={handleImageRedo}
          disabled={!imageUrl || !isEditable}
        />
      </Tooltip>

      <Tooltip title="Clear All" placement="right">
        <MenuItem 
          key="clear" 
          icon={<DeleteOutlined />}
          onClick={handleImageClear}
          disabled={!imageUrl || !isEditable}
        />
      </Tooltip>

     
      {/* View Tools */}
      <Tooltip title="Zoom In" placement="right">
        <MenuItem 
          key="zoom-in" 
          icon={<ZoomInOutlined />}
          onClick={handleImageZoomIn}
          disabled={!imageUrl}
        />
      </Tooltip>

      <Tooltip title="Zoom Out" placement="right">
        <MenuItem 
          key="zoom-out" 
          icon={<ZoomOutOutlined />}
          onClick={handleImageZoomOut}
          disabled={!imageUrl}
        />
      </Tooltip>

      <Tooltip title="Pan Mode" placement="right">
        <MenuItem 
          key="pan" 
          icon={<ArrowsAltOutlined />}
          onClick={handleImagePanStart}
          disabled={!imageUrl}
        />
      </Tooltip>

      <Tooltip title="Reset View" placement="right">
        <MenuItem 
          key="reset-view" 
          icon={<ShrinkOutlined />}
          onClick={handleImagePanReset}
          disabled={!imageUrl}
        />
      </Tooltip>
       {/* File Operations */}
       <Tooltip title="Upload Image" placement="right">
        <MenuItem 
          key="upload" 
          icon={<UploadOutlined />} 
          onClick={handleImageUpload}
        />
      </Tooltip>

      <Tooltip title="Download Image" placement="right">
        <MenuItem 
          key="download" 
          icon={<DownloadOutlined />} 
          onClick={handleImageDownload}
          disabled={!imageUrl}
        />
      </Tooltip>

      <Tooltip title="Save Image" placement="right">
        <MenuItem 
          key="save" 
          icon={<SaveOutlined />} 
          onClick={handleImageSave}
          disabled={!imageUrl}
        />
      </Tooltip>

      <Tooltip title="Load Annotations" placement="right">
        <MenuItem 
          key="load-annotations" 
          icon={<FolderOpenFilled />} 
          onClick={loadSavedState}
          disabled={!isEditable}
        />
      </Tooltip>

      <Tooltip title="Save Annotations" placement="right">
        <MenuItem 
          key="save-annotations" 
          icon={<SaveFilled />} 
          onClick={saveCanvasState}
          disabled={!isEditable}
        />
      </Tooltip>
    </Menu>
  );
}