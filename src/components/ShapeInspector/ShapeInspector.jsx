// src/components/ShapeInspector/ShapeInspector.jsx

import React from "react";
import { Card } from "antd";
import ShapeOptionsPanel from "../ShapeOptionsPanel/ShapeOptionsPanel";

const ShapeInspector = ({
  selectedShape,
  form,
  shapeOptionsMap,
  fieldLabels,
  propertyFields,
  onSave,
}) => {
  if (!selectedShape) return null;
  const fields = propertyFields[selectedShape.type] || [];

  return (
    <Card
      title="Shape Properties"
      bordered={false}
      className="property-editor-card"
    >
      <ShapeOptionsPanel
        fields={fields}
        form={form}
        shapeOptionsMap={shapeOptionsMap}
        fieldLabels={fieldLabels}
        onSave={onSave}
      />
    </Card>
  );
};

export default ShapeInspector;
