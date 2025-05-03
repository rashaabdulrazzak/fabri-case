import React, { useState } from "react";
import useFabric from "./components/useFabric";
import FabricDrawing from "./components/FabricDrawing";

function App() {
  const { canvasRef, addShape, setDrawingMode, toggleSelection } = useFabric();
  const [mode, setMode] = useState("select");

  // Handle mode change (e.g., draw mode or select mode)
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setDrawingMode(newMode); // Set drawing mode
  };

  return (
    <div>
     
      
      <FabricDrawing
      />
    </div>
  );
}

export default App;
