import React from "react";
import PropTypes from "prop-types";

export default class FormInput extends React.Component {
  // -----
  // Props
  // -----
  // name: PropTypes.string.isRequired,
  // onChange: PropTypes.func.isRequired

  render() {
    const {name, onChange} = this.props;
    const type = (name === "email" | "password") ? name : "text";
    return (
      <input
        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
        id={name}
        name={name}
        type={type}
        // value={formData.email}
        onChange={onChange}
      />
    );
  }
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}