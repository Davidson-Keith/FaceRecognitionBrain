import React from "react";
import PropTypes from 'prop-types';


export default class Box extends React.Component {
  // -----
  // Props
  // -----
  // top: PropTypes.number.isRequired,
  // right: PropTypes.number.isRequired,
  // bottom: PropTypes.number.isRequired,
  // left: PropTypes.number.isRequired,

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
  top: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  bottom: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
};
