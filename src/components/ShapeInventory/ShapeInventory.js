import React, { useState,useEffect } from "react";
import {
  List,
  Card,
  Collapse,
  Badge,
  Select,
  message,
  Form,
  Button,
} from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import "./ShapeInventory.css";
import ShapeList from "../ShapeList/ShapeList"; // Ensure this path is correct based on your project structure
import ShapeOptionsPanel from "../ShapeOptionsPanel/ShapeOptionsPanel"; // update the path based on your file structure
import { getTypeColor } from "../../utils/helpers"; // Ensure this path is correct based on your project structure
import { prepareFormData, updateShapeProperties} from "../../utils/getLabel"; // Ensure this path is correct based on your project structure
import { shapeOptionsMap ,propertyFields,fieldLabels} from "../../shapeOptions"; // Ensure this path is correct based on your project structure
const { Panel } = Collapse;


const ShapeInventory = ({ canvas,isEditable }) => {
  const [selectedShape, setSelectedShape] = useState(null);
  const [shapeProperties, setShapeProperties] = useState({});
  const [activePanel, setActivePanel] = useState([
    "nodules",
    "strapKasi",
    "zeminParenkim",
    "rect",
    "punctateEchogenicFocis",
    "macroCalcifications",
    "peripheralRimCalcifications",

  ]);
  const targetTypes = [
    'nodule',
    'strap-kasi',
    'zemin-parenkim'
  ];
const categories
= [
  "rateFileNodules",
  "strapKasis",
  "zeminParenkims",     
    "punctateEchogenicFocis",
    "macroCalcifications",
    "peripheralRimCalcifications"

]; // Adjust the import path as necessary
  const [form] = Form.useForm();

  
  const getShapeDetails = () => {
    if (!canvas)
      return {
        nodules: [],
        strapKasi: [],
        zeminParenkim: [],
        punctateEchogenicFocis: [],
        macroCalcifications: [],
        peripheralRimCalcifications: [],
        rectangles: [],
      };

    const shapes = {
      nodules: [],
      strapKasi: [],
      zeminParenkim: [],
      punctateEchogenicFocis: [],
      rectangles: [],
        macroCalcifications: [],
        peripheralRimCalcifications: [],
    };

    canvas.getObjects().forEach((obj, index) => {
       
       
      const shapeItem = {
        id: `${obj.type}-${index}`,
        type: obj.dataType || obj.type,
        object: obj,
        properties: obj.properties || {},
        
      };

      if (obj.dataType === "nodule"  || obj.dataType === "rateFileNodules") {
        shapes.nodules.push(shapeItem);
      } else if (obj.dataType === "strap-kasi" || obj.dataType === "strapKasis") {
        shapes.strapKasi.push(shapeItem);
      } else if (obj.dataType === "zemin-parenkim" || obj.dataType === "zeminParenkims") {
        shapes.zeminParenkim.push(shapeItem);
      } else if (obj.dataType === "rect") {
        shapes.rectangles.push(shapeItem);
      } else if (obj.dataType === "punctateEchogenicFocis") {
        shapes.punctateEchogenicFocis.push(shapeItem);
      } else if (obj.dataType === "macroCalcifications") {
        shapes.macroCalcifications.push(shapeItem);
      }
      else if (obj.dataType === "peripheralRimCalcifications") {
        shapes.peripheralRimCalcifications.push(shapeItem);
      }
      else {
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
   
    // Set the form values based on the selected shape
    
    // Initialize form with existing properties
    const fieldProps = prepareFormData(shape);

    form.setFieldsValue(fieldProps || {});
    // Set the active panel based on the shape type
 
    switch (shape.type) {
      case "nodule":
        case "rateFileNodules":  
        setActivePanel(["nodules"]);
        break;
      case "strap-kasi":
        setActivePanel(["strapKasi"]);
        break;
        case "zemin-parenkim":
        setActivePanel(["zeminParenkim"]);
        break;
        case "rect":
        setActivePanel(["rect"]);
        break;
        case "punctateEchogenicFocis":
        setActivePanel(["punctateEchogenicFocis"]);
        break;
        case "macroCalcifications":
        setActivePanel(["macroCalcifications"]);
        break;
        case "peripheralRimCalcifications":
        setActivePanel(["peripheralRimCalcifications"]);
        break;
      default:
        setActivePanel([]);
    }
  };

  const handlePropertiesSave = () => {
    if (!selectedShape || !canvas) return;

    const values = form.getFieldsValue();
 
    const updatedShape = updateShapeProperties(selectedShape, values);

    setSelectedShape( updatedShape);
    setShapeProperties(values);
    // Update the shape in canvas
    canvas.renderAll();
    message.success("Properties saved successfully");
    setSelectedShape(null);
    setShapeProperties({});
    form.resetFields();
  };

  const shapes = getShapeDetails();



  const renderPropertyEditor = () => {
    if (!selectedShape) return null;
    const fields = propertyFields[selectedShape.type];
    return (
      <ShapeOptionsPanel
        fields={fields}
        form={form}
        shapeOptionsMap={shapeOptionsMap}
        fieldLabels={fieldLabels}
        onSave={handlePropertiesSave}
        isEditable={isEditable}
        
      />
    );
  };
  useEffect(() => {
    console.log("isEditable",isEditable );

    
    // Add any other logic you want to trigger on change
  }, [isEditable]);
  return (
    <div className="inventory-wrapper">
      <Card
        title="Shape Inventory"
        bordered={false}
        className="shape-inventory"
        headStyle={{ borderBottom: 0 }}
      >
        <Collapse
          bordered={false}
          activeKey={activePanel}
          onChange={(keys) => setActivePanel(keys)}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="inventory-collapse"
        >
          <Panel
            header={
              <span>
                Nodules{" "}
                <Badge
                  count={shapes.nodules.length}
                  style={{ backgroundColor: getTypeColor("nodule") }}
                />
              </span>
            }
            key="nodules"
          >
            <ShapeList
              shapes={shapes.nodules}
              selectedShape={selectedShape}
              onClick={handleShapeClick}
            />
          </Panel>

          <Panel
            header={
              <span>
                Strap Kasi{" "}
                <Badge
                  count={shapes.strapKasi.length}
                  style={{ backgroundColor: getTypeColor("strap-kasi") }}
                />
              </span>
            }
            key="strapKasi"
          >
            <List
              dataSource={shapes.strapKasi}
              renderItem={(item) => (
                <List.Item
                  className={`inventory-item ${
                    selectedShape?.id === item.id ? "selected" : ""
                  }`}
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
                Zemin Parenkim{" "}
                <Badge
                  count={shapes.zeminParenkim.length}
                  style={{ backgroundColor: getTypeColor("zemin-parenkim") }}
                />
              </span>
            }
            key="zeminParenkim"
          >
            <ShapeList
              shapes={shapes.zeminParenkim}
              selectedShape={selectedShape}
              onClick={handleShapeClick}
            />
          </Panel>
            <Panel
                header={
                <span>
                    Rectangles{" "}
                    <Badge
                    count={shapes.rectangles.length}
                    style={{ backgroundColor: getTypeColor("rect") }}
                    />
                </span>
                }
                key="rect"  
            >
                <ShapeList
                shapes={shapes.rectangles}
                selectedShape={selectedShape}
                onClick={handleShapeClick}
                />
            </Panel>
            <Panel
                header={
                <span>
                    Punctate Echogenic Foci{" "}
                    <Badge
                    count={shapes.punctateEchogenicFocis.length}
                    style={{ backgroundColor: getTypeColor("punctateEchogenicFocis") }}
                    />
                </span>
                }
                key="punctateEchogenicFocis"
            >
                <ShapeList
                shapes={shapes.punctateEchogenicFocis}
                selectedShape={selectedShape}
                onClick={handleShapeClick}
                />
            </Panel>    
            <Panel
                header={
                <span>
                    Macrocalcifications{" "}
                    <Badge
                    count={shapes.macroCalcifications.length}
                    style={{ backgroundColor: getTypeColor("macroCalcifications") }}
                    />
                </span>
                }
                key="macroCalcifications"
            >   
                <ShapeList
                shapes={shapes.macroCalcifications}
                selectedShape={selectedShape}
                onClick={handleShapeClick}
                />
            </Panel>
            <Panel
                header={
                <span>
                    Peripheral Rim Calcifications{" "}
                    <Badge
                    count={shapes.peripheralRimCalcifications.length}
                    style={{ backgroundColor: getTypeColor("peripheralRimCalcifications") }}
                    />
                </span>
                }
                key="peripheralRimCalcifications"
            >
                <ShapeList
                shapes={shapes.peripheralRimCalcifications}
                selectedShape={selectedShape}
                onClick={handleShapeClick}
                />
            </Panel>  
        </Collapse>
      </Card>

  <div className="property-editor-container">
      {selectedShape ? (
        <Card title="Shape Properties" bordered={false}>
          {renderPropertyEditor()}
        </Card>
      ) : (
        <div className="empty-state">No shape selected</div>
      )}
    </div>

    </div>
  );
};

export default ShapeInventory;
