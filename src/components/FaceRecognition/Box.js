import React from "react";
import PropTypes from 'prop-types';


export default class Box extends React.Component {
  // -----
  // Props
  // -----
  // top: PropTypes.string.isRequired,
  // right: PropTypes.string.isRequired,
  // bottom: PropTypes.string.isRequired,
  // left: PropTypes.string.isRequired,

  render() {
    return (
      <div
        className="boundingBox"
        style={{
          top: this.props.top,
          right: this.props.right,
          bottom: this.props.bottom,
          left: this.props.left,
        }}
      ></div>
    )
  }
}

Box.propTypes = {
  top: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
  bottom: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
};
