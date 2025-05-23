// File: shapeOptions.js

export const shapeOptionsMap = {
  composition: [
  "Cystic or almost completely cystic",
  "Spongiform",
  "Mixed cystic and solid",
  "Solid or almost completely solid"
  ],
  echogenicity: [
    "Anechoic",
    "Hyperechoic or isoechoic",
    "Hypoechoic",
    "Hypoechoic",
    "Very hypoechoic",
  ],
  shape: ["Wider-than-tall", "Taller-than-wide"],
  margin: ["Smooth", "Ill-defined", "Lobulated/irregular", "Extra-thyroidal extension"],
  echogenicFoci: [
    "None or large comet-tail artifact",
    "Macrocalcifications",
    "Peripheral/rim calcifications",
    "Punctate echogenic foci",
  ],
  measured: ["Yes", "No"],
  needleInNodule: ["Yes", "No"],
  notSuitable: ["Yes", "No"],
  heterojenite: ["Homojen", "Heterojen"],
  echogenicFociSinifi:["non specific echogenic foci","probably microcalcification"],
    tiradsCategory: [
        "TIRADS 1",
        "TIRADS 2",
        "TIRADS 3",
        "TIRADS 4",
        "TIRADS 5",
        "TIRADS 6",
    ],
};

export const propertyFields = {
  rateFileNodules: [
    "composition",
    "echogenicity",
    "shape",
    "margin",
    "echogenicFoci",
    "measured",
    "needleInNodule",
    "notSuitable",
  ],
  "zemin-parenkim": ["heterojenite"],
  zeminParenkims: ["heterojenite"],
  nodule: [
    "composition",
    "echogenicity",
    "shape",
    "margin",
    "echogenicFoci",
    "measured",
    "needleInNodule",
    "notSuitable",
  ],
  punctateEchogenicFocis :[
    "echogenicFociSinifi"
  ]

};

export const fieldLabels = {
  composition: "Composition",
  echogenicity: "Echogenicity",
  shape: "Shape",
  margin: "Margin",
  echogenicFoci: "Echogenic Foci",
  measured: "Measured",
  needleInNodule: "Needle in Nodule",
  notSuitable: "Not Suitable",
  heterojenite: "Heterojenite",
  tiradsCategory: "TIRADS Category",
  tiradsScore: "TIRADS Score",
  bethesda: "Bethesda",
  subset: "Subset",
  punctateEchogenicFoci: "Punctate Echogenic Foci",
};
export const shapeOptions = {
  composition: {
    title: "Composition",
    options: shapeOptionsMap.composition,
  },
  echogenicity: {
    title: "Echogenicity",
    options: shapeOptionsMap.echogenicity,
  },
  shape: {
    title: "Shape",
    options: shapeOptionsMap.shape,
  },
  margin: {
    title: "Margin",
    options: shapeOptionsMap.margin,
  },
  echogenicFoci: {
    title: "Echogenic Foci",
    options: shapeOptionsMap.echogenicFoci,
  },
  heterojenite: {
    title: "Heterojenite",
    options: shapeOptionsMap.heterojenite,
  },
  punctateEchogenicFocis:{
    title: "Punctate Echogenic Foci",
    options: shapeOptionsMap.punctateEchogenicFocis,
  }
};
export const shapeColors = {
  composition: {
    Solid: "green",
    "Predominantly Solid": "yellow",
    Spongiform: "blue",
    "Mixed cystic and solid": "purple",
    Cystic: "red",
  },
  echogenicity: {
    Anechoic: "green",
    Hyperechoic: "yellow",
    Isoechoic: "blue",
    Hypoechoic: "purple",
    "Very hypoechoic": "red",
  },
  shape: {
    "Wider-than-tall": "green",
    "Taller-than-wide": "red",
  },
  margin: {
    Smooth: "green",
    Irregular: "yellow",
    Lobulated: "blue",
    "Extrathyroidal extension": "red",
  },
  echogenicFoci: {
    None: "",
    Macrocalcifications: "",
    "Peripheral (rim) calcifications": "",
    "Punctate echogenic foci": "",
  },
};
export const shapeDescriptions = {
  composition: {
    Solid: "Solid",
    "Predominantly Solid": "Predominantly Solid",
    Spongiform: "Spongiform",
    "Mixed cystic and solid": "Mixed cystic and solid",
    Cystic: "Cystic",
  },
  echogenicity: {
    Anechoic: "Anechoic",
    Hyperechoic: "Hyperechoic",
    Isoechoic: "Isoechoic",
    Hypoechoic: "Hypoechoic",
    "Very hypoechoic": "Very hypoechoic",
  },
  shape: {
    "Wider-than-tall": "Wider-than-tall",
    "Taller-than-wide": "Taller-than-wide",
  },
  margin: {
    Smooth: "Smooth",
    Irregular: "Irregular",
    Lobulated: "Lobulated",
    "Extrathyroidal extension": "Extrathyroidal extension",
  },
  echogenicFoci: {
    None: "",
    Macrocalcifications: "",
    " Peripheral (rim) calcifications": "",
    "Punctate echogenic foci": "",
  },
};
export const shapeDescriptionsMap = {
  composition: {
    Solid: "Solid",
    "Predominantly Solid": "Predominantly Solid",
    Spongiform: "Spongiform",
    "Mixed cystic and solid": "Mixed cystic and solid",
    Cystic: "Cystic",
  },
  echogenicity: {
    Anechoic: "Anechoic",
    Hyperechoic: "Hyperechoic",
    Isoechoic: "Isoechoic",
    Hypoechoic: "Hypoechoic",
    "Very hypoechoic": "Very hypoechoic",
  },
  shape: {
    "Wider-than-tall": "Wider-than-tall",
    "Taller-than-wide": "Taller-than-wide",
  },
  margin: {
    Smooth: "Smooth",
    Irregular: "Irregular",
    Lobulated: "Lobulated",
    "Extrathyroidal extension": "Extrathyroidal extension",
  },
  echogenicFoci: {
    None: "",
    Macrocalcifications: "",
    " Peripheral (rim) calcifications": "",
    "Punctate echogenic foci": "",
  },
};
export const categories = [
  "rateFileNodules",
  "strapKasis",
  "zeminParenkims",
  "punctateEchogenicFocis",
  "macroCalcifications",
  "peripheralRimCalcifications",
];
