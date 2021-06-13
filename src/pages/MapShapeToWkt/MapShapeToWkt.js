import React, { useState } from "react";
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
import { Popover } from "antd";

export default function MapShapeToWkt({ map }) {
  const [displayValue, setDisplayValue] = useState(null);

  return (
    <div>
      {Boolean(map) && (
        <ToggleGroup
          allowDeselect={false}
          orientation={"horizontal"}
          className="map-to-wkt"
        >
          <DigitizeButton
            name="drawLine"
            map={map}
            shape="circle"
            drawType="LineString"
            digitizeLayerName="drawLayer"
            size="large"
            // onDrawStart={clearDrawFeatures}
            // onDrawEnd={storeDrawFeature}
          >
            <Popover content="Draw line" placement="top">
              <MinusOutlined />
            </Popover>
          </DigitizeButton>

          <DigitizeButton
            name="drawPolygon"
            map={map}
            drawType="Polygon"
            digitizeLayerName="drawLayer"
            shape="circle"
            size="large"
            // onDrawStart={clearDrawFeatures}
            // onDrawEnd={storeDrawFeature}
          >
            <Popover content="Draw Polygon" placement="top">
              <SelectOutlined />
            </Popover>
          </DigitizeButton>

          <DigitizeButton
            name="drawRectangle"
            map={map}
            drawType="Rectangle"
            digitizeLayerName="drawLayer"
            shape="circle"
            size="large"
            // onDrawStart={clearDrawFeatures}
            // onDrawEnd={storeDrawFeature}
          >
            <Popover content="Draw Regtangle" placement="top">
              <BorderOutlined />
            </Popover>
          </DigitizeButton>

          <DigitizeButton
            name="drawCircle"
            map={map}
            drawType="Circle"
            digitizeLayerName="drawLayer"
            shape="circle"
            size="large"
            // onDrawStart={clearDrawFeatures}
            // onDrawEnd={storeDrawFeature}
          >
            <Popover content="Draw Circle" placement="top">
              <CheckCircleOutlined />
            </Popover>
          </DigitizeButton>

          <DigitizeButton
            name="selectAndModify"
            digitizeLayerName="drawLayer"
            map={map}
            editType="Edit"
            shape="circle"
            size="large"
            // onModifyEnd={storeDrawFeature}
            // onModifyStart={storeDrawFeature}
            // onTranslateEnd={storeDrawFeature}
          >
            <Popover content="Edit Shape" placement="top">
              <EditOutlined />
            </Popover>
          </DigitizeButton>
        </ToggleGroup>
      )}
    </div>
  );
}
