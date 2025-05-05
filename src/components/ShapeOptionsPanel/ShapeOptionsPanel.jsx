import React from 'react';
import { Form, Select, Button } from 'antd';
const { Option } = Select;

const ShapeOptionsPanel = ({ fields, form, shapeOptionsMap, onSave }) => {
  if (!fields || fields.length === 0) {
    return <p>No properties to edit for this shape type</p>;
  }

  return (
    <div className="property-editor">
      <Form form={form} layout="vertical">
        {fields.map(field => (
          <Form.Item key={field} name={field} label={field.charAt(0).toUpperCase() + field.slice(1)}>
            <Select>
              {shapeOptionsMap[field]?.map(opt => (
                <Option key={opt} value={opt}>{opt}</Option>
              ))}
            </Select>
          </Form.Item>
        ))}
        <Button type="primary" onClick={onSave}>
          Save Properties
        </Button>
      </Form>
    </div>
  );
};

export default ShapeOptionsPanel;
