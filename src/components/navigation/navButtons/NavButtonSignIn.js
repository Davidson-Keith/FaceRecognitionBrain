import React from "react";
import PropTypes from "prop-types";
import NavButton from "./NavButton";

export default class NavButtonSignIn extends React.Component {
  // -----
  // Props
  // -----
  // onClick: PropTypes.func.isRequired

  render() {
    return <NavButton text={"Sign In"} onClick={this.props.onClick} />;
  }
}

NavButtonSignIn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
