import React, { useState } from 'react';
import { List, Card, Collapse, Badge, Select, message, Form, Button,Descriptions } from 'antd';
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
  const [activePanel, setActivePanel] = useState(['nodules', 'strapKasi', 'zeminParenkim']);

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
    switch (shape.type) {
        case 'nodule':
          setActivePanel(['nodules']);
          break;
        case 'strap-kasi':
          setActivePanel(['strapKasi']);
          break;
        case 'zemin-parenkim':
          setActivePanel(['zeminParenkim']);
          break;
        default:
          setActivePanel([]);
      }
  };

  const handlePropertiesSave = () => {
    if (!selectedShape || !canvas) return;
    
    const values = form.getFieldsValue();
    selectedShape.object.set('properties', values);
    setShapeProperties(values);
    
    // Update the shape in canvas
    canvas.renderAll();
    message.success('Properties saved successfully');
    setSelectedShape(null);
    setShapeProperties({});
    form.resetFields();
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
  const renderPropertyViewer = () => {
    if (!selectedShape?.properties) return null;

    return (
      <Descriptions bordered column={1} size="small">
        {Object.entries(selectedShape.properties).map(([key, value]) => (
          <Descriptions.Item key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
            {value}
          </Descriptions.Item>
        ))}
      </Descriptions>
    );
  };
    const renderShapeList = (shapes) => {
        return (
        <List
            dataSource={shapes}
            renderItem={item => (
            <List.Item 
                className={`inventory-item ${selectedShape?.id === item.id ? 'selected' : ''}`}
                onClick={() => handleShapeClick(item)}
            >
                <div>
                    <span className="shape-label">
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)} {shapes.indexOf(item) + 1}
                    </span>
                    {selectedShape?.id === item.id && selectedShape?.properties && (
  <div
    style={{
      marginTop: "8px",
      padding: "8px",
      background: "#f5f5f5",
      borderRadius: "4px",
    }}
  >
    {Object.entries(selectedShape.properties)
      .filter(([key]) => !["measured", "needleInNodule", "notSuitableForUse"].includes(key))
      .map(([key, value]) => (
        <div
          key={key}
          style={{
            display: "flex",
            fontSize: "12px",
            marginBottom: "4px",
            lineHeight: "1.4",
          }}
        >
          <span
            style={{
              fontWeight: "500",
              minWidth: "100px",
              color: "#666",
            }}
          >
            {key === "heterojenitesi"
              ? "Heterojenite"
              : key.charAt(0).toUpperCase() + key.slice(1)}
            :
          </span>
          <span style={{ color: "#222" }}>{value}</span>
        </div>
      ))}
  </div>
)}

                </div>
            </List.Item>
            )}
        />
        );
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
           activeKey={activePanel}
           onChange={keys => setActivePanel(keys)}
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
         
            {renderShapeList(shapes.nodules)}
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
           
            {renderShapeList(shapes.zeminParenkim)}
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