import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import UspItem from "./UspItem";

function UspBar() {
  return (
    <div className="layout-wrapper usp-bar">
      <div className="layout-container">
        <div className="usp-container">
          <ul className="usp-list">
            <UspItem
              icon={<CheckIcon className="usp-icon" />}
              text={"Gratis verzending vanaf 20,-"}
            />
            <UspItem
              icon={<CheckIcon className="usp-icon" />}
              text={"Bezorging dezelfde dag, 's avonds of in het weekend"}
            />
            <UspItem
              icon={<CheckIcon className="usp-icon" />}
              text={"Gratis retourneren"}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UspBar;
