
  import { Tooltip } from "antd";
  
  const IconButton = ({ icon, onClick, tooltip, active, disabled }) => (
    <Tooltip title={tooltip} placement="right">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`icon-button ${active ? "active" : ""}`}
      >
        {icon}
      </button>
    </Tooltip>
  );
  
  export default IconButton;