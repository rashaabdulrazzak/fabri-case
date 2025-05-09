import { Select, Form, Checkbox, Input,Button } from "antd";

const { Option } = Select;

const ShapeOptionsPanel = ({ fields, form, shapeOptionsMap, fieldLabels,onSave }) => {
    const checkboxFields = ["measured", "needleInNodule", "notSuitable"];
   
  
    return (
      <Form form={form} layout="vertical" onFinish={onSave}>
        {fields?.map((field) => (
          <Form.Item
            key={field}
            name={field}
            label={fieldLabels[field] || field}
            valuePropName={checkboxFields.includes(field) ? "checked" : "value"}
          >
            {checkboxFields.includes(field) ? (
              <Checkbox />
            ) : shapeOptionsMap[field] ? (
              <Select>
                {shapeOptionsMap[field].map((opt) => (
                  <Select.Option key={opt} value={opt}>
                    {opt}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <Input />
            )}
          </Form.Item>
        ))}
        {fields && <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>}
        {!fields && <p style={{ color: "#999" }}>No associated properties</p>}
        
      </Form>
    );
};

export default ShapeOptionsPanel;
