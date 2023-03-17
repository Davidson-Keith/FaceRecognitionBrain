import React from "react";
import PropTypes from "prop-types";
import NavButton from "./NavButton";

export default class NavButtonSignOut extends React.Component {
  // -----
  // Props
  // -----
  // onClick: PropTypes.func.isRequired

  render() {
    return <NavButton text={"Sign Out"} onClick={this.props.onClick} />;
  }
}

NavButtonSignOut.propTypes = {
  onClick: PropTypes.func.isRequired,
};
