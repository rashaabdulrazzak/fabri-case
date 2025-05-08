import { List, Collapse } from "antd";
import "./ShapeList.css";
import { getLabel } from "../../utils/getLabel";
const ShapeList = ({ shapes, selectedShape, onClick }) => {
  const { Panel } = Collapse;
  return (
    <div>
     
      
      <Collapse accordion>
        {shapes.map((item, index) => {
          console.log("item", item);
          const meta =
            item.object.properties.properties  || item.properties || {};
          console.log("meta", meta);
          return (
            <Panel
              header={
                <span
                  className={`inventory-item ${
                    selectedShape?.id === item.id ? "selected" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick(item);
                  }}
                >
                  {item.type} {index + 1}
                </span>
              }
              key={item.id}
            >
              {Object.keys(meta).length === 0 ? (
                <p style={{ color: "#999" }}>No metadata</p>
              ) : (
                <ul>
                {Object.entries(meta)
                  .filter(([key]) => key !== "noduleMask")
                  .map(([key, value]) =>
                    typeof value === 'boolean' ? (
                      <li key={key}>
                      <span
                        key={key}
                        className={`property-value ${value ? 'boolean-true' : 'boolean-false'}`}
                      >
                        <strong>{key}:</strong> {value ? '✅ ' : '❌ '}
                      </span>
                      </li>
                    ) : (
                      <li key={key}>
                        <strong>{key}:</strong> {typeof value === 'number' ? getLabel(key,value) : value}
                      </li>
                    )
                  )}
              </ul>
              
              )}
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};
export default ShapeList;
