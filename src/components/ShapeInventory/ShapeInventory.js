import React, { useState } from 'react';
import { List, Card, Collapse, Badge, Select, message, Form, Button } from 'antd';
import {
  CaretRightOutlined,
  DotChartOutlined,
  BorderOutlined
} from '@ant-design/icons';
import './ShapeInventory.css';

const { Panel } = Collapse;
const { Option } = Select;

const ShapeInventory = ({ canvas }) => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [shapeProperties, setShapeProperties] = useState({});
  const [form] = Form.useForm();

  const compositionOptions = [
    'Solid', 'Predominantly Solid', 'Predominantly Cystic', 'Cystic', 'Spongiform'
  ];
  
  const echogenicityOptions = [
    'Anechoic', 'Hyperechoic', 'Hypoechoic', 'Isoechoic', 'Very Hypoechoic'
  ];
  
  const shapeOptions = [
    'Wider-than-tall', 'Taller-than-wide'
  ];
  
  const marginOptions = [
    'Smooth', 'Irregular', 'Lobulated', 'Microlobulated', 'Extra-thyroidal extension'
  ];
  
  const echogenicFociOptions = [
    'None', 'Macrocalcifications', 'Peripheral calcifications', 'Punctate echogenic foci'
  ];
  
  const heterojeniteOptions = [
    'Homojen', 'Heterojen', 'Kistik Degenerasyon', 'Kalsifikasyon'
  ];

  const getShapeDetails = () => {
    if (!canvas) return { 
      nodules: [],
      strapKasi: [],
      zeminParenkim: [],
      rectangles: [] 
    };
    
    const shapes = {
      nodules: [],
      strapKasi: [],
      zeminParenkim: [],
      rectangles: []
    };

    canvas.getObjects().forEach((obj, index) => {
      const shapeItem = {
        id: `${obj.type}-${index}`,
        type: obj.dataType || obj.type,
        object: obj,
        properties: obj.properties || {}
      };

      if (obj.dataType === 'nodule') {
        shapes.nodules.push(shapeItem);
      } else if (obj.dataType === 'strap-kasi') {
        shapes.strapKasi.push(shapeItem);
      } else if (obj.dataType === 'zemin-parenkim') {
        shapes.zeminParenkim.push(shapeItem);
      } else if (obj.type === 'rect') {
        shapes.rectangles.push(shapeItem);
      }
    });

    return shapes;
  };

  const handleShapeClick = (shape) => {
    if (!canvas) return;
    
    canvas.discardActiveObject();
    canvas.setActiveObject(shape.object);
    canvas.requestRenderAll();
    
    setSelectedShape(shape);
    setShapeProperties(shape.properties || {});
    
    // Initialize form with existing properties
    form.setFieldsValue(shape.properties || {});
  };

  const handlePropertiesSave = () => {
    if (!selectedShape || !canvas) return;
    
    const values = form.getFieldsValue();
    selectedShape.object.set('properties', values);
    setShapeProperties(values);
    
    // Update the shape in canvas
    canvas.renderAll();
    message.success('Properties saved successfully');
  };

  const shapes = getShapeDetails();

  const getTypeColor = (type) => {
    switch(type) {
      case 'nodule': return 'red';
      case 'strap-kasi': return 'blue';
      case 'zemin-parenkim': return 'purple';
      case 'rect': return 'green';
      default: return 'gray';
    }
  };

  const renderPropertyEditor = () => {
    if (!selectedShape) return null;
    
    switch(selectedShape.type) {
      case 'nodule':
        return (
          <div className="property-editor">
            <h3>Nodule Properties</h3>
            <Form form={form} layout="vertical">
              <Form.Item name="composition" label="Composition">
                <Select>
                  {compositionOptions.map(opt => (
                    <Option key={opt} value={opt}>{opt}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item name="echogenicity" label="Echogenicity">
                <Select>
                  {echogenicityOptions.map(opt => (
                    <Option key={opt} value={opt}>{opt}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item name="shape" label="Shape">
                <Select>
                  {shapeOptions.map(opt => (
                    <Option key={opt} value={opt}>{opt}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item name="margin" label="Margin">
                <Select>
                  {marginOptions.map(opt => (
                    <Option key={opt} value={opt}>{opt}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item name="echogenicFoci" label="Echogenic Foci">
                <Select>
                  {echogenicFociOptions.map(opt => (
                    <Option key={opt} value={opt}>{opt}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Button type="primary" onClick={handlePropertiesSave}>
                Save Properties
              </Button>
            </Form>
          </div>
        );
        
      case 'strap-kasi':
        return (
          <div className="property-editor">
            <h3>Strap Kasi</h3>
            <p>No properties to edit for this shape type</p>
          </div>
        );
        
      case 'zemin-parenkim':
        return (
          <div className="property-editor">
            <h3>Zemin Parenkim Properties</h3>
            <Form form={form} layout="vertical">
              <Form.Item name="heterojenite" label="Heterojenite">
                <Select>
                  {heterojeniteOptions.map(opt => (
                    <Option key={opt} value={opt}>{opt}</Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Button type="primary" onClick={handlePropertiesSave}>
                Save Properties
              </Button>
            </Form>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="inventory-container">
      <Card 
        title="Shape Inventory" 
        bordered={false}
        className="shape-inventory"
        headStyle={{ borderBottom: 0 }}
      >
        <Collapse 
          bordered={false}
          defaultActiveKey={['nodules', 'strapKasi', 'zeminParenkim']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          className="inventory-collapse"
        >
          <Panel 
            header={
              <span>
                Nodules <Badge 
                  count={shapes.nodules.length} 
                  style={{ backgroundColor: getTypeColor('nodule') }} 
                />
              </span>
            } 
            key="nodules"
          >
            <List
              dataSource={shapes.nodules}
              renderItem={item => (
                <List.Item 
                  className={`inventory-item ${selectedShape?.id === item.id ? 'selected' : ''}`}
                  onClick={() => handleShapeClick(item)}
                >
                  <span className="shape-label">
                    Nodule {shapes.nodules.indexOf(item) + 1}
                  </span>
                </List.Item>
              )}
            />
          </Panel>

          <Panel 
            header={
              <span>
                Strap Kasi <Badge 
                  count={shapes.strapKasi.length} 
                  style={{ backgroundColor: getTypeColor('strap-kasi') }} 
                />
              </span>
            } 
            key="strapKasi"
          >
            <List
              dataSource={shapes.strapKasi}
              renderItem={item => (
                <List.Item 
                  className={`inventory-item ${selectedShape?.id === item.id ? 'selected' : ''}`}
                  onClick={() => handleShapeClick(item)}
                >
                  <span className="shape-label">
                    Strap Kasi {shapes.strapKasi.indexOf(item) + 1}
                  </span>
                </List.Item>
              )}
            />
          </Panel>

          <Panel 
            header={
              <span>
                Zemin Parenkim <Badge 
                  count={shapes.zeminParenkim.length} 
                  style={{ backgroundColor: getTypeColor('zemin-parenkim') }} 
                />
              </span>
            } 
            key="zeminParenkim"
          >
            <List
              dataSource={shapes.zeminParenkim}
              renderItem={item => (
                <List.Item 
                  className={`inventory-item ${selectedShape?.id === item.id ? 'selected' : ''}`}
                  onClick={() => handleShapeClick(item)}
                >
                  <span className="shape-label">
                    Zemin Parenkim {shapes.zeminParenkim.indexOf(item) + 1}
                  </span>
                </List.Item>
              )}
            />
          </Panel>
        </Collapse>
      </Card>
      
      {selectedShape && (
        <Card 
          title="Shape Properties" 
          bordered={false}
          className="property-editor-card"
        >
          {renderPropertyEditor()}
        </Card>
      )}
    </div>
  );
};

export default ShapeInventory;