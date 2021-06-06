import React, { useState, useEffect } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import {
  clearMap,
  drawWktFeature,
  removeLayer,
} from "../../components/Map/MapHelpers";
import "./WktToMap.scss";

export default function WktToMap({ map }) {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const inputValueChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (map) {
      if (inputValue) {
        if (
          inputValue.includes("POINT") ||
          inputValue.includes("LINESTRING") ||
          inputValue.includes("POLYGON") ||
          inputValue.includes("MULTIPOINT") ||
          inputValue.includes("MULTILINESTRING") ||
          inputValue.includes("MULTIPOLYGON") ||
          inputValue.includes("GEOMETRYCOLLECTION")
        ) {
          drawWktFeature(map, inputValue);
        } else {
          removeLayer(map, "wktLayer");
          setInputError("The submitted geometry is not a valid WKT");
        }
      }
    }
  };

  return (
    <div className="wkt-to-map">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>WKT</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            onChange={inputValueChangeHandler}
          />
        </Form.Group>
        <div className="two-col-btns-wrapper">
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Draw On Map
          </Button>
          <Button variant="secondary" type="button">
            Clear Map
          </Button>
        </div>

        {Boolean(inputError) && (
          <Alert variant="danger" className="mb-3">
            {inputError}
          </Alert>
        )}
      </Form>
    </div>
  );
}
