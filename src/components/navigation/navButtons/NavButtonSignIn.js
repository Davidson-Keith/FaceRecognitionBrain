import React from "react";
import PropTypes from "prop-types";
import NavButtonTach from "./NavButtonTach";

export default class NavButtonSignInTach extends React.Component {
  // -----
  // Props
  // -----
  // onClick: PropTypes.func.isRequired

  render() {
    return <NavButtonTach text={"Sign In"} onClick={this.props.onClick} />;
  }
}

NavButtonSignInTach.propTypes = {
  onClick: PropTypes.func.isRequired,
};
