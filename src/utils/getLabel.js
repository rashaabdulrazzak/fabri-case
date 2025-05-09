import {
  echogenicityMap,
  echogenicFociMap,
  compositionMap,
  shapeMap,
  marginMap,
  heterojenitesiMap,
} from "./propertyValueMaps";

import { shapeOptionsMap } from "../shapeOptions"; // Ensure this file exists and exports shapeOptionsMap

export const propertyValueMaps = {
  echogenicity: echogenicityMap,
  echogenicFoci: echogenicFociMap,
  composition: compositionMap,
  shape: shapeMap,
  margin: marginMap,
  heterojenitesi: heterojenitesiMap,
};
const targetTypes = ['nodule', 'strap-kasi', 'zemin-parenkim'];
const categories = [
  "rateFileNodules",
  "strapKasis",
  "zeminParenkims",     
  "punctateEchogenicFocis",
  "macroCalcifications",
  "peripheralRimCalcifications"
];

export function getLabel(propertyName, numericValue) {
  const map = propertyValueMaps[propertyName];
  return map?.[numericValue] ?? numericValue;
}
export function getLabelFromMap(propertyName, numericValue) {
    const map = propertyValueMaps[propertyName];
    return map?.[numericValue] ?? numericValue;
}
export const reverseLabelMap = Object.entries(shapeOptionsMap).reduce(
  (acc, [field, options]) => {
    acc[field] = options.reduce((innerAcc, label, index) => {
      innerAcc[label] = index;
      return innerAcc;
    }, {});
    return acc;
  },
  {}
);
// Function to process field values based on shape type
function processFieldValue(shape, field, value) {
    // If shape is from targetTypes, use the value as-is
    if (targetTypes.includes(shape.type)) {
      return value;
    }
    
    // If shape is from categories and field has a mapping, convert the value
    if (propertyValueMaps[field] && typeof value === 'number') {
      return getLabel(field, value);
    }
    
    // For other cases, return the value as-is
    return value;
  }

  export function prepareFormData(shape) {
    const isTargetType = targetTypes.includes(shape.type);
    const fieldProps = isTargetType 
      ? shape?.properties || {}
      : shape?.properties?.properties || {};
    
    const formData = {};
    
    // Process each field
    for (const [field, value] of Object.entries(fieldProps)) {
      formData[field] = processFieldValue(shape, field, value);
    }
    
    
    return formData;
    }

    export function updateShapeProperties(selectedShape, values) {
       
        // Make sure properties exist
        if (!selectedShape.properties) {
           selectedShape.properties = {};
        }
      
        if (targetTypes.includes(selectedShape.type)) {
          // For targetTypes - update direct properties
          selectedShape.object.set("properties", values);
          selectedShape.properties.properties = values;
        } else {
          // For categories - ensure nested properties exists
          if (!selectedShape.properties.properties) {
            selectedShape.properties.properties = {};
          }
          
          // Update nested properties while preserving others
          selectedShape.properties.properties = {
            ...selectedShape.properties.properties,
            ...values
          };
        }
      
        return selectedShape;
      }
      
  