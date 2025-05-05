import { List, Card, Collapse, Badge, Select, message, Form, Button,Descriptions } from 'antd';
import React, { useState, useEffect } from 'react';
const ShapeList = ({ shapes, selectedShape, onClick }) => (
    <List
      dataSource={shapes}
      renderItem={(item, index) => (
        <List.Item
          className={`inventory-item ${selectedShape?.id === item.id ? 'selected' : ''}`}
          onClick={() => onClick(item)}
        >
          <div>
            <span className="shape-label">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)} {index + 1}
            </span>
            {selectedShape?.id === item.id && selectedShape?.properties && (
              <div className="shape-details">
                {Object.entries(selectedShape.properties)
                  .filter(([key]) => !['measured', 'needleInNodule', 'notSuitableForUse'].includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="property-row">
                      <span className="property-key">
                        {key === 'heterojenitesi' ? 'Heterojenite' : key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>
                      <span className="property-value">{value}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </List.Item>
      )}
    />
  );
  export default ShapeList;