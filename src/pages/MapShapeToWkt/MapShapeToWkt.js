import React, { useState, useEffect } from "react";
import { DigitizeButton, ToggleGroup } from "@terrestris/react-geo";
import { MapUtil } from "@terrestris/ol-util";
import "./MapShapeToWkt.scss";
import { Popover, Form, Input } from "antd";
import WKT from "ol/format/WKT";
import { fromCircle } from "ol/geom/Polygon";
import { AiOutlineMinus, BsCircle, BiRectangle, BiPolygon } from "react-icons/all";
const { TextArea } = Input;

export default function MapShapeToWkt({ map }) {
  const [displayValue, setDisplayValue] = useState(null);

  useEffect(() => {
    return () => {
      if (map) clearShape();
    };
  }, []);

  const clearShape = () => {
    const shapeLayer = MapUtil.getLayerByName(map, "shapeLayer");
    shapeLayer.getSource().clear();
  };

  const shapeToWkt = (evt) => {
    let feature = evt.feature;
    let geometry;

    const featureType = feature.getGeometry().getType();
    if (featureType === "Circle") {
      geometry = fromCircle(feature.getGeometry());
    } else {
      geometry = feature.getGeometry();
    }

    const format = new WKT();

    const wktRepresenation = format.writeGeometry(geometry, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });

    setDisplayValue(wktRepresenation);
  };

  return (
    <div className="map-to-wkt">
      {Boolean(map) && (
        <ToggleGroup allowDeselect={false} orientation={"horizontal"} className="map-to-wkt-btns">
          <DigitizeButton name="drawLine" map={map} shape="circle" drawType="LineString" digitizeLayerName="shapeLayer" size="large" onDrawStart={clearShape} onDrawEnd={shapeToWkt}>
            <Popover content="Draw line" placement="top">
              <AiOutlineMinus />
            </Popover>
          </DigitizeButton>

          <DigitizeButton name="drawPolygon" map={map} drawType="Polygon" digitizeLayerName="shapeLayer" shape="circle" size="large" onDrawStart={clearShape} onDrawEnd={shapeToWkt}>
            <Popover content="Draw Polygon" placement="top">
              <BiPolygon />
            </Popover>
          </DigitizeButton>

          <DigitizeButton name="drawRectangle" map={map} drawType="Rectangle" digitizeLayerName="shapeLayer" shape="circle" size="large" onDrawStart={clearShape} onDrawEnd={shapeToWkt}>
            <Popover content="Draw Regtangle" placement="top">
              <BiRectangle />
            </Popover>
          </DigitizeButton>

          <DigitizeButton name="drawCircle" map={map} drawType="Circle" digitizeLayerName="shapeLayer" shape="circle" size="large" onDrawStart={clearShape} onDrawEnd={shapeToWkt}>
            <Popover content="Draw Circle" placement="top">
              <BsCircle />
            </Popover>
          </DigitizeButton>

          {/* <DigitizeButton
            name="selectAndModify"
            digitizeLayerName="shapeLayer"
            map={map}
            editType="Edit"
            shape="circle"
            size="large"
          >
            <Popover content="Edit Shape" placement="top">
              <FiEdit />
            </Popover>
          </DigitizeButton> */}
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
