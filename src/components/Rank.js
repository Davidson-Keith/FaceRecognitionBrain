import React from "react";
import PropTypes from "prop-types";

// const Rank = ({ userName, entries }) => {

class EntryCount extends React.Component {
  // -----
  // Props
  // -----
  // userName: PropTypes.string.isRequired
  // entries: PropTypes.number.isRequired // integer >= 0.

  render() {
    console.log(
      "Rank(userName, entries) - userName, entries:",
      this.props.userName,
      this.props.entries
    );
    return (
      <div>
        <div className="f4 tc">
          {this.props.userName}, your current entry count is...
        </div>
        <div className="f2 tc">{this.props.entries}</div>
      </div>
    );
  };
}

EntryCount.propTypes = {
  userName: PropTypes.string.isRequired,
  entries: PropTypes.number.isRequired, // integer >= 0.
};

export default EntryCount;
