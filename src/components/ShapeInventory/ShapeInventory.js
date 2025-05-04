import React from 'react';
import { fabric } from 'fabric';

import './ShapeInventory.css';

const ShapeInventory = ({ canvas }) => {
  const getShapeCounts = () => {
    if (!canvas) return {};
    
    const counts = {
      nodule: 0,
      'strap-kasi': 0,
      'zemin-parenkim': 0,
      rectangle: 0,
      circle: 0
    };

    canvas.getObjects().forEach(obj => {
      if (obj.dataType) {
        // Count polygon types
        if (obj.dataType === 'nodule') counts.nodule++;
        if (obj.dataType === 'strap-kasi') counts['strap-kasi']++;
        if (obj.dataType === 'zemin-parenkim') counts['zemin-parenkim']++;
      } else {
        // Count basic shapes
        if (obj.type === 'rect') counts.rectangle++;
        if (obj.type === 'circle') counts.circle++;
      }
    });

    return counts;
  };

  const counts = getShapeCounts();

  const handleShapeClick = (type) => {
    if (!canvas) return;
    
    let objects;
    if (['nodule', 'strap-kasi', 'zemin-parenkim'].includes(type)) {
      objects = canvas.getObjects().filter(obj => obj.dataType === type);
    } else {
      objects = canvas.getObjects().filter(obj => obj.type === type);
    }

    canvas.discardActiveObject();
    
    if (objects.length > 0) {
      if (objects.length === 1) {
        canvas.setActiveObject(objects[0]);
      } else {
        const group = new fabric.ActiveSelection(objects, {
          canvas: canvas,
        });
        canvas.setActiveObject(group);
      }
      canvas.requestRenderAll();
    }
  };

  return (
    <div className="shape-inventory">
      <h3>Shape Inventory</h3>
      <div className="inventory-section">
        <h4>Polygons</h4>
        <ul>
          <li onClick={() => handleShapeClick('nodule')}>
            <span className="color-indicator red"></span>
            Nodules: <strong>{counts.nodule}</strong>
          </li>
          <li onClick={() => handleShapeClick('strap-kasi')}>
            <span className="color-indicator blue"></span>
            Strap Kasi: <strong>{counts['strap-kasi']}</strong>
          </li>
          <li onClick={() => handleShapeClick('zemin-parenkim')}>
            <span className="color-indicator purple"></span>
            Zemin Parenkim: <strong>{counts['zemin-parenkim']}</strong>
          </li>
        </ul>
      </div>
      
      <div className="inventory-section">
        <h4>Basic Shapes</h4>
        <ul>
          <li onClick={() => handleShapeClick('rect')}>
            <span className="color-indicator green"></span>
            Rectangles: <strong>{counts.rectangle}</strong>
          </li>
          <li onClick={() => handleShapeClick('circle')}>
            <span className="color-indicator orange"></span>
            Circles: <strong>{counts.circle}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShapeInventory;