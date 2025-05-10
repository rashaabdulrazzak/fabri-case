import { Select, Form, Checkbox, Input,Button } from "antd";

// Removed unused Option import

const ShapeOptionsPanel = ({ fields, form, shapeOptionsMap, fieldLabels, onSave, isEditable }) => {
    const checkboxFields = ["measured", "needleInNodule", "notSuitable"];
console.log("isEditable", isEditable);
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
              <Checkbox disabled={!isEditable} />
            ) : shapeOptionsMap[field] ? (
              <Select disabled={!isEditable}>
                {shapeOptionsMap[field].map((opt) => (
                  <Select.Option key={opt} value={opt}>
                    {opt}
                  </Select.Option>
                ))}
              </Select>
            ) : (
              <Input disabled={!isEditable} />
            )}
          </Form.Item>
        ))}
        {fields  && (
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={!isEditable}>
              Save
            </Button>
          </Form.Item>
        )}
        {!fields && <p style={{ color: "#999" }}>No associated properties</p>}
      </Form>
    );
};

export default ShapeOptionsPanel;
