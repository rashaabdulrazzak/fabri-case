import { useEffect, useState } from 'react';

// Sample data (this would be imported or fetched in a real scenario)
import exampleData from '../exampleData.json';

const categories = [
  "rateFileNodules",
  "strapKasis",
  "zeminParenkims",
  "punctateEchogenicFocis",
  "macroCalcifications",
  "peripheralRimCalcifications"
];

const useShapeData = () => {
  const [shapeData, setShapeData] = useState([]);
console.log("useShapeData", shapeData);
  useEffect(() => {
    const extractedShapeData = [];

    categories.forEach((category) => {
      const items = exampleData[category];
      if (Array.isArray(items)) {
        items.forEach((item, index) => {
          if (item.noduleMask) {
            try {
              const points = JSON.parse(item.noduleMask);
              extractedShapeData.push({
                category,
                points,
                color: "red", // You can change this dynamically or based on conditions
                type: `${category}`,
                id: `${category}_${index}`
              });
            } catch (e) {
              console.error(`Invalid mask in ${category}[${index}]`, e);
            }
          }
        });
      }
    });

    setShapeData(extractedShapeData);
  }, []); // Empty dependency array, so it runs once on component mount

  return shapeData;
};

export default useShapeData;
