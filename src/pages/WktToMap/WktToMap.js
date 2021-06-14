import React, { useState, useEffect } from "react";
import { Form, Input, Button, Tag } from "antd";
import {
  drawWktFeature,
  removeLayer,
  validateGeometry,
} from "../../components/Map/MapHelpers";
import "./WktToMap.scss";
const { TextArea } = Input;

export default function WktToMap({ map }) {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    return () => {
      if (map) removeLayer(map, "wktLayer");
    };
  }, []);

  const inputValueChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (map) {
      if (inputValue) {
        const validation = validateGeometry(inputValue);
        if (validation) {
          drawWktFeature(map, inputValue);
          setInputError("");
        } else {
          removeLayer(map, "wktLayer");
          setInputError("The submitted geometry is not a valid WKT");
        }
      }
    }
  };

  const handleClearMap = () => {
    if (map) {
      removeLayer(map, "wktLayer");
      setInputError("");
      setInputValue("");
    }
  };

  return (
    <div className="wkt-to-map">
      <Form layout="vertical">
        <Form.Item label="WKT">
          <TextArea rows={6} onChange={inputValueChangeHandler} />
        </Form.Item>

        {Boolean(inputError) && (
          <Tag color="error" className="full-width error-tag">
            {inputError}
          </Tag>
        )}

        <div className="two-col-btns-wrapper">
          <Button htmlType="submit" type="primary" onClick={handleSubmit}>
            Draw On Map
          </Button>
          <Button htmlType="button" onClick={handleClearMap}>
            Clear Map
          </Button>
        </div>
      </Form>
    </div>
  );
}
