import React from "react";
import PropTypes from "prop-types";

export default class NavButton extends React.Component {
  // -----
  // Props
  // -----
  // text: PropTypes.string.isRequired,
  // onClick: PropTypes.func.isRequired

  render() {
    return (
      <span
        className="f6 dib white bg-animate hover-bg-white hover-black mr2 mr2-ns pv2 ph3 br2 ba b--white-20 pointer"
        onClick={this.props.onClick}
      >
        {this.props.text}
      </span>
    );
  }
}

NavButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
