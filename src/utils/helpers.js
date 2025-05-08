export const getTypeColor = (type) => {
  switch (type) {
    case "nodule":
    case "rateFileNodules":
      return "red";
    case "strap-kasi":
    case "strapKasis":
      return "blue";
    case "zemin-parenkim":
    case "zeminParenkims":
      return "purple";
    case "rect":
      return "yellow";
    case "punctateEchogenicFocis":
      return "orange";
    case "macroCalcifications":
      return "green";
    case "peripheralRimCalcifications":
      return "pink";
    default:
      return "gray";
  }
};
