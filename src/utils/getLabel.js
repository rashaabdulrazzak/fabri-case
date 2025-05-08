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
  
  export function getLabel(propertyName, numericValue) {
  
    const map = propertyValueMaps[propertyName];
    return map?.[numericValue] ?? `Unknown (${numericValue})`;
  }
    export function getLabelFromMap(propertyName, numericValue) {
        const map = propertyValueMaps[propertyName];
        return map?.[numericValue] ?? `Unknown (${numericValue})`;
    }   
    export const reverseLabelMap = Object.entries(shapeOptionsMap).reduce((acc, [field, options]) => {
        acc[field] = options.reduce((innerAcc, label, index) => {
          innerAcc[label] = index;
          return innerAcc;
        }, {});
        return acc;
      }, {});