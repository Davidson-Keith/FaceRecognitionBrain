import React from "react";
import PropTypes from "prop-types";
import NavButton from "./NavButton";

export default class NavButtonRegister extends React.Component {
  // -----
  // Props
  // -----
  // onClick: PropTypes.func.isRequired

  render() {
    return <NavButton text={"Register"} onClick={this.props.onClick} />;
  }
}

NavButtonRegister.propTypes = {
  onClick: PropTypes.func.isRequired,
};
