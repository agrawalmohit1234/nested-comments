import React from "react";
import PropTypes from "prop-types";

const Action = ({ type, className, handleClick }) => {
  return (
    <span onClick={handleClick} className={className}>
      {type}
    </span>
  );
};

Action.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

Action.defaultProps = {
  className: "",
};

export default Action;
