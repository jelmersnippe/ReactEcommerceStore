import React from "react";
import PropTypes from "prop-types";

function UspItem({ icon, text }) {
  return (
    <li className="usp-item">
      {icon && icon}
      {text}
    </li>
  );
}

UspItem.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
};

export default UspItem;
