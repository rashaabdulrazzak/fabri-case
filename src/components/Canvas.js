// components/Canvas.js
import React, { useEffect } from "react";
import useFabric from "./useFabric";

const Canvas = ({ fabricAPI }) => {
  const { canvasRef, initCanvas } = fabricAPI;

  useEffect(() => {
    initCanvas(canvasRef.current);
  }, [initCanvas]);

  return <canvas ref={canvasRef} id="fabric-canvas" />;
};

export default Canvas;
