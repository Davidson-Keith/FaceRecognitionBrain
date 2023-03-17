import React from "react";
import PropTypes from "prop-types";
import NavButtonTach from "./NavButtonTach";

export default class NavButtonRegisterTach extends React.Component {
  // -----
  // Props
  // -----
  // onClick: PropTypes.func.isRequired

  render() {
    return <NavButtonTach text={"Register"} onClick={this.props.onClick} />;
  }
}

NavButtonRegisterTach.propTypes = {
  onClick: PropTypes.func.isRequired,
};
