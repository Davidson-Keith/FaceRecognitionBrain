import React from "react";
import PropTypes from "prop-types";
import NavButtonTach from "./NavButtonTach";

export default class NavButtonSignOutTach extends React.Component {
  // -----
  // Props
  // -----
  // onClick: PropTypes.func.isRequired

  render() {
    return <NavButtonTach text={"Sign Out"} onClick={this.props.onClick} />;
  }
}

NavButtonSignOutTach.propTypes = {
  onClick: PropTypes.func.isRequired,
};
