import React from 'react';
import { List, Card, Tag, Collapse, Badge } from 'antd';
import {
  CaretRightOutlined,
  DotChartOutlined,
  BorderOutlined
} from '@ant-design/icons';
import './ShapeInventory.css';

const { Panel } = Collapse;

const ShapeInventory = ({ canvas }) => {
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
        object: obj
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
      // Circles are intentionally excluded
    });

    return shapes;
  };

  const handleShapeClick = (obj) => {
    if (!canvas) return;
    canvas.discardActiveObject();
    canvas.setActiveObject(obj);
    canvas.requestRenderAll();
  };

  const shapes = getShapeDetails();

  const getTypeIcon = (type) => {
    switch(type) {
      case 'rect': return <BorderOutlined />;
      default: return <DotChartOutlined />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'nodule': return 'red';
      case 'strap-kasi': return 'blue';
      case 'zemin-parenkim': return 'purple';
      case 'rect': return 'green';
      default: return 'gray';
    }
  };

  const getDisplayName = (type) => {
    switch(type) {
      case 'strap-kasi': return 'Strap Kasi';
      case 'zemin-parenkim': return 'Zemin Parenkim';
      case 'rect': return 'Rectangle';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <Card 
      title="Shape Inventory" 
      bordered={false}
      className="shape-inventory"
      headStyle={{ borderBottom: 0 }}
    >
      <Collapse 
        bordered={false}
        defaultActiveKey={['nodules', 'strapKasi', 'zeminParenkim', 'rectangles']}
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
                className="inventory-item"
                onClick={() => handleShapeClick(item.object)}
              >
                <Tag color={getTypeColor(item.type)}>
                  {getTypeIcon(item.type)} {getDisplayName(item.type)}
                </Tag>
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
                className="inventory-item"
                onClick={() => handleShapeClick(item.object)}
              >
                <Tag color={getTypeColor(item.type)}>
                  {getTypeIcon(item.type)} {getDisplayName(item.type)}
                </Tag>
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
                className="inventory-item"
                onClick={() => handleShapeClick(item.object)}
              >
                <Tag color={getTypeColor(item.type)}>
                  {getTypeIcon(item.type)} {getDisplayName(item.type)}
                </Tag>
              </List.Item>
            )}
          />
        </Panel>

        <Panel 
          header={
            <span>
              Rectangles <Badge 
                count={shapes.rectangles.length} 
                style={{ backgroundColor: getTypeColor('rect') }} 
              />
            </span>
          } 
          key="rectangles"
        >
          <List
            dataSource={shapes.rectangles}
            renderItem={item => (
              <List.Item 
                className="inventory-item"
                onClick={() => handleShapeClick(item.object)}
              >
                <Tag color={getTypeColor(item.type)}>
                  {getTypeIcon(item.type)} {getDisplayName(item.type)}
                </Tag>
              </List.Item>
            )}
          />
        </Panel>
      </Collapse>
    </Card>
  );
};

export default ShapeInventory;