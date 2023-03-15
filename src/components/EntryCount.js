import React from "react";
import PropTypes from "prop-types";

// const EntryCount = ({ userName, entries }) => {

class EntryCount extends React.Component {
  // -----
  // Props
  // -----
  // userName: PropTypes.string.isRequired
  // entries: PropTypes.number.isRequired // integer >= 0.

  render() {
    console.log(
      "EntryCount(userName, entries) - userName, entries:",
      this.props.userName,
      this.props.entries
    );
    return (
      <div>
        {/* <div className="f3 tc"> */}
        <span className="f6 white mr3 mr4-ns">{this.props.userName}</span>
        <span className="f6 white mr3 mr4-ns">
          Entry Count: {this.props.entries}
        </span>
        {/* <div className="f3 tc">Entry Count: {this.props.entries}</div> */}
      </div>
    );
  }
}

EntryCount.propTypes = {
  userName: PropTypes.string.isRequired,
  entries: PropTypes.number.isRequired, // integer >= 0.
};

export default EntryCount;
