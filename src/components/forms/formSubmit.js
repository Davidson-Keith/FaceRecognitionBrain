import React from "react";
import PropTypes from "prop-types";

export default class FormSubmit extends React.Component {
  // -----
  // Props
  // -----
  // value: PropTypes.string.isRequired,
  // onClick: PropTypes.func.isRequired

  render() {
    const {value, onClick} = this.props;
    return (
      <input
        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
        type="submit"
        value={value}
        onClick={onClick}
      />
    );
  }
}

FormSubmit.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}