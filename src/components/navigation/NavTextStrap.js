import React from "react";
import PropTypes from "prop-types";

export default class NavTextTach extends React.Component {
  // -----
  // Props
  // -----
  // text: PropTypes.string.isRequired,
  render() {
    return <span className="f6 dib white mr3 mr4-ns">{this.props.text}</span>;
  }
}

NavTextTach.propTypes = {
  text: PropTypes.string.isRequired,
};
