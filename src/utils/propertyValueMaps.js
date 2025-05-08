export const echogenicity = [
    { id: 1, key: "Anechoic", name: "Anechoic", value: 1, label: "Anechoic", weight: 0 },
    { id: 2, key: "Hyperechoic Or Isoechoic", name: "Hyperechoic Or Isoechoic", value: 2, label: "Hyperechoic Or Isoechoic", weight: 1 },
    { id: 3, key: "Hypoechoic", name: "Hypoechoic", value: 3, label: "Hypoechoic", weight: 2 },
    { id: 4, key: "Very Hypoechoic", name: "Very Hypoechoic", value: 4, label: "Very Hypoechoic", weight: 3 },
  ];
  export const echogenicityMap = echogenicity.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});

// Echogenic Foci
export const echogenicFoci = [
    { id: 1, key: "None Or Large Comet-Tail Artifact", name: "None Or Large Comet-Tail Artifact", value: 1, label: "None Or Large Comet-Tail Artifact", weight: 0, probability: 0 },
    { id: 2, key: "Macrocalcifications", name: "Macrocalcifications", value: 2, label: "Macrocalcifications", weight: 1, probability: 0 },
    { id: 3, key: "Peripheral/Rim Calcifications", name: "Peripheral/Rim Calcifications", value: 4, label: "Peripheral/Rim Calcifications", weight: 2, probability: 0 },
    { id: 4, key: "Punctate Enhogenic Foci", name: "Punctate Enhogenic Foci", value: 8, label: "Punctate Enhogenic Foci", weight: 3, probability: 0 },
  ];
  
  export const echogenicFociMap = echogenicFoci.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});
// Composition
// Composition
export const composition = [
    { id: 1, key: "Cystic Or Almost Completely Cystic", name: "Cystic Or Almost Completely Cystic", value: 1, label: "Cystic Or Almost Completely Cystic", weight: 0 },
    { id: 2, key: "Spongiform", name: "Spongiform", value: 2, label: "Spongiform", weight: 0 },
    { id: 3, key: "Mixed Cystic And Solid", name: "Mixed Cystic And Solid", value: 3, label: "Mixed Cystic And Solid", weight: 1 },
    { id: 4, key: "Solid Or Almost Completely Solid", name: "Solid Or Almost Completely Solid", value: 4, label: "Solid Or Almost Completely Solid", weight: 2 },
  ];
  
  export const compositionMap = composition.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});

 // Shape
export const shape = [
    { id: 1, key: "Wider-Than-Tall", name: "Wider-Than-Tall", value: 1, label: "Wider-Than-Tall", weight: 0 },
    { id: 2, key: "Taller-Than-Wide", name: "Taller-Than-Wide", value: 2, label: "Taller-Than-Wide", weight: 3 },
  ];
  
  export const shapeMap = shape.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});
  

  
  // Margin
export const margin = [
    { id: 1, key: "Smooth", name: "Smooth", value: 1, label: "Smooth", weight: 0 },
    { id: 2, key: "Ill-Defined", name: "Ill-Defined", value: 2, label: "Ill-Defined", weight: 0 },
    { id: 3, key: "Lobulated Or Irregular", name: "Lobulated Or Irregular", value: 3, label: "Lobulated Or Irregular", weight: 2 },
    { id: 4, key: "Extra-Thyroidal Extension", name: "Extra-Thyroidal Extension", value: 4, label: "Extra-Thyroidal Extension", weight: 3 },
  ];
  
  export const marginMap = margin.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});
  
  // Heterojenitesi
export const heterojenitesi = [
    { id: 1, key: "Homogeneous", name: "Homogeneous", value: 1, label: "Homogeneous", weight: 0 },
    { id: 2, key: "Mildly Heterogeneous", name: "Mildly Heterogeneous", value: 2, label: "Mildly Heterogeneous", weight: 1 },
    { id: 3, key: "Markedly Heterogeneous", name: "Markedly Heterogeneous", value: 3, label: "Markedly Heterogeneous", weight: 2 },
  ];
  
  export const heterojenitesiMap = heterojenitesi.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
  }, {});
export const shapeOptionsMap = {
    echogenicity: echogenicity,
    shape: shape,
    margin: margin,
    echogenicFoci: echogenicFoci,
    composition: composition,
  };
export const fieldLabels = {
    echogenicity: "Echogenicity",
    shape: "Shape",
    margin: "Margin",
    echogenicFoci: "Echogenic Foci",
    composition: "Composition",
  };
export const propertyFields = [
    "echogenicity",
    "shape",
    "margin",
    "echogenicFoci",
    "composition",
  ];
export const checkboxFields = [
    "measured",
    "needleInNodule",
    "notSuitable",
  ];
export const shapeOptions = {
    echogenicity: {
      title: "Echogenicity",
      options: echogenicity,
    },
    shape: {
      title: "Shape",
      options: shape,
    },
    margin: {
      title: "Margin",
      options: margin,
    },
    echogenicFoci: {
      title: "Echogenic Foci",
      options: echogenicFoci,
    },
    composition: {
      title: "Composition",
      options: composition,
    },
  };
export const shapeColors = {
    echogenicity: {
      Anechoic: "green",
      "Hyperechoic Or Isoechoic": "yellow",
      Hypoechoic: "blue",
      "Very Hypoechoic": "purple",
    },
    shape: {
      "Wider-than-tall": "red",
      "Taller-than-wide": "orange",
    },
    margin: {
      Smooth: "pink",
      Irregular: "cyan",
      Lobulated: "magenta",
      "Extrathyroidal extension": "brown",
    },
    echogenicFoci: {
      None: "gray",
      Macrocalcifications: "lightblue",
      "Peripheral (rim) calcifications": "lightgreen",
      "Punctate echogenic foci": "lightcoral",
    },
    composition: {
      Solid: "lightyellow",
      "Predominantly Solid": "lightpink",
      Spongiform: "lightcyan",
      "Mixed cystic and solid": "lightgray",
      Cystic: "lightgoldenrodyellow",
    },
  };    
