import React, { useState, useEffect } from "react";
import {
  LoginOutlined,
  UserAddOutlined,
  SettingOutlined,
  GroupOutlined,
  FormOutlined,
  MinusOutlined,
  BorderOutlined,
  SelectOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { DigitizeButton, ToggleGroup } from "@terrestris/react-geo";
import { MapUtil, GeometryUtil } from "@terrestris/ol-util";
import "./MapShapeToWkt.scss";
import { Popover, Form, Input } from "antd";
import WKT from "ol/format/WKT";
import { removeLayer } from "../../components/Map/MapHelpers";
const { TextArea } = Input;

export default function MapShapeToWkt({ map }) {
  const [displayValue, setDisplayValue] = useState(null);

  const clearShape = () => {
    const shapeLayer = MapUtil.getLayerByName(map, "shapeLayer");
    shapeLayer.getSource().clear();
  };

  const shapeToWkt = (evt) => {
    let feature;
    let geometry;
    if (evt.type === "drawend") {
      feature = evt.feature;
    }
    const featureType = feature.getGeometry().getType();
    geometry = feature.getGeometry();

    const format = new WKT();

    let wktRepresenation = null;
    wktRepresenation = format.writeGeometry(geometry, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });

    setDisplayValue(wktRepresenation);
  };

  return (
    <div className="map-to-wkt">
      {Boolean(map) && (
        <ToggleGroup
          allowDeselect={false}
          orientation={"horizontal"}
          className="map-to-wkt-btns"
        >
          <DigitizeButton
            name="drawLine"
            map={map}
            shape="circle"
            drawType="LineString"
            digitizeLayerName="shapeLayer"
            size="large"
            onDrawStart={clearShape}
            onDrawEnd={shapeToWkt}
          >
            <Popover content="Draw line" placement="top">
              <MinusOutlined />
            </Popover>
          </DigitizeButton>

          <DigitizeButton
            name="drawPolygon"
            map={map}
            drawType="Polygon"
            digitizeLayerName="shapeLayer"
            shape="circle"
            size="large"
            onDrawStart={clearShape}
            onDrawEnd={shapeToWkt}
          >
            <Popover content="Draw Polygon" placement="top">
              <SelectOutlined />
            </Popover>
          </DigitizeButton>

          <DigitizeButton
            name="drawRectangle"
            map={map}
            drawType="Rectangle"
            digitizeLayerName="shapeLayer"
            shape="circle"
            size="large"
            onDrawStart={clearShape}
            onDrawEnd={shapeToWkt}
          >
            <Popover content="Draw Regtangle" placement="top">
              <BorderOutlined />
            </Popover>
          </DigitizeButton>

          <DigitizeButton
            name="drawCircle"
            map={map}
            drawType="Circle"
            digitizeLayerName="shapeLayer"
            shape="circle"
            size="large"
            onDrawStart={clearShape}
            onDrawEnd={shapeToWkt}
          >
            <Popover content="Draw Circle" placement="top">
              <CheckCircleOutlined />
            </Popover>
          </DigitizeButton>

          <DigitizeButton
            name="selectAndModify"
            digitizeLayerName="shapeLayer"
            map={map}
            editType="Edit"
            shape="circle"
            size="large"
          >
            <Popover content="Edit Shape" placement="top">
              <EditOutlined />
            </Popover>
          </DigitizeButton>
        </ToggleGroup>
      )}

      <Form layout="vertical">
        <Form.Item label="WKT">
          <TextArea rows={6} value={displayValue} readOnly />
        </Form.Item>
      </Form>
    </div>
  );
}
