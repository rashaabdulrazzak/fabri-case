// File: shapeOptions.js
export const shapeOptionsMap = {
    composition: ['Solid', 'Predominantly Solid', 'Spongiform', 'Mixed cystic and solid', 'Cystic'],
    echogenicity: ['Anechoic', 'Hyperechoic', 'Isoechoic', 'Hypoechoic', 'Very hypoechoic'],
    shape: ['Wider-than-tall', 'Taller-than-wide'],
    margin: ['Smooth', 'Irregular', 'Lobulated', 'Extrathyroidal extension'],
    echogenicFoci: ['None', 'Macrocalcifications', 'Peripheral (rim) calcifications', 'Punctate echogenic foci'],
    heterojenite: ['Homojen', 'Heterojen']
  };
  
  export const propertyFields = {
    nodule: ['composition', 'echogenicity', 'shape', 'margin', 'echogenicFoci'],
    'zemin-parenkim': ['heterojenite']
  };
    export const shapeOptions = {
        composition: {
        title: 'Composition',
        options: shapeOptionsMap.composition,
        },
        echogenicity: {
        title: 'Echogenicity',
        options: shapeOptionsMap.echogenicity,
        },
        shape: {
        title: 'Shape',
        options: shapeOptionsMap.shape,
        },
        margin: {
        title: 'Margin',
        options: shapeOptionsMap.margin,
        },
        echogenicFoci: {
        title: 'Echogenic Foci',
        options: shapeOptionsMap.echogenicFoci,
        },
        heterojenite: {
        title: 'Heterojenite',
        options: shapeOptionsMap.heterojenite,
        },
    };
    export const shapeColors = {
        composition: {
            'Solid': 'green',
            'Predominantly Solid': 'yellow',
            'Spongiform': 'blue',
            'Mixed cystic and solid': 'purple',
            'Cystic': 'red',
        },
        echogenicity: {
            'Anechoic': 'green',
            'Hyperechoic': 'yellow',
            'Isoechoic': 'blue',
            'Hypoechoic': 'purple',
            'Very hypoechoic': 'red',
        },
        shape: {
            'Wider-than-tall': 'green',
            'Taller-than-wide': 'red',
        },
        margin: {
            'Smooth': 'green',
            'Irregular': 'yellow',
            'Lobulated': 'blue',
            'Extrathyroidal extension': 'red',
        },
        echogenicFoci: {
            None: '',
            Macrocalcifications: '',
            'Peripheral (rim) calcifications': '',
            'Punctate echogenic foci': '',
        },
    };
    export const shapeDescriptions = {
        composition: {
            'Solid': 'Solid',
            'Predominantly Solid': 'Predominantly Solid',
            'Spongiform': 'Spongiform',
            'Mixed cystic and solid': 'Mixed cystic and solid',
            'Cystic': 'Cystic',
        },
        echogenicity: {
            'Anechoic': 'Anechoic',
            'Hyperechoic': 'Hyperechoic',
            'Isoechoic': 'Isoechoic',
            'Hypoechoic': 'Hypoechoic',
            'Very hypoechoic': 'Very hypoechoic',
        },
        shape: {
            'Wider-than-tall': 'Wider-than-tall',
            'Taller-than-wide': 'Taller-than-wide',
        },
        margin: {
            'Smooth': 'Smooth',
            'Irregular': 'Irregular',
            'Lobulated': 'Lobulated',
            'Extrathyroidal extension': 'Extrathyroidal extension',
        },
        echogenicFoci: {
            None: '',
            Macrocalcifications: '',
           ' Peripheral (rim) calcifications': '',
            'Punctate echogenic foci': '',
        },
    };
    export const shapeDescriptionsMap = {
        composition: {
            'Solid': 'Solid',
            'Predominantly Solid': 'Predominantly Solid',
            'Spongiform': 'Spongiform',
            'Mixed cystic and solid': 'Mixed cystic and solid',
            'Cystic': 'Cystic',
        },
        echogenicity: {
            'Anechoic': 'Anechoic',
            'Hyperechoic': 'Hyperechoic',
            'Isoechoic': 'Isoechoic',
            'Hypoechoic': 'Hypoechoic',
            'Very hypoechoic': 'Very hypoechoic',
        },
        shape: {
            'Wider-than-tall': 'Wider-than-tall',
            'Taller-than-wide': 'Taller-than-wide',
        },
        margin: {
            'Smooth': 'Smooth',
            'Irregular': 'Irregular',
            'Lobulated': 'Lobulated',
            'Extrathyroidal extension': 'Extrathyroidal extension',
        },
        echogenicFoci: {
            None: '',
            Macrocalcifications: '',
           ' Peripheral (rim) calcifications': '',
            'Punctate echogenic foci': '',
        },
    };
    