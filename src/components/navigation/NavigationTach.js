import React from "react";
import LogoTach from "../logo/LogoTach";
// import EntryCountTach from "../EntryCountTach";
import PropTypes from "prop-types";
import NavTextTach from "./NavTextTach";
import NavButtonTach from "./navButtons/NavButtonTach";
import NavButtonSignInTach from "./navButtons/NavButtonSignInTach";
import "tachyons"; // Replace all CSS files with tachyons CSS framework.
class NavigationTach extends React.Component {
  // -----
  // Props
  // -----
  // onRouteChange: PropTypes.func.isRequired
  // route: PropTypes.string.isRequired
  // user: PropTypes.object.isRequired

  render() {
    let mainSection;
    const mainSectionClass = "flex-grow pl3 pt3 pb3 flex items-center";
    if (this.props.route === "main") {
      mainSection = (
        <div className={mainSectionClass}>
          <NavTextTach text={this.props.user.name} />
          <NavTextTach text={`Entry Count: ${this.props.user.entries}`} />
          <NavButtonTach
            text={"Sandpit"}
            onClick={() => this.props.onRouteChange("sandpit")}
          />
          <NavButtonTach
            text={"Sign Out"}
            onClick={() => this.props.onRouteChange("signIn")}
          />
        </div>
      );
    }
    if (this.props.route === "signIn") {
      mainSection = (
        <div className={mainSectionClass}>
          <NavButtonTach
            text={"Sandpit"}
            onClick={() => this.props.onRouteChange("sandpit")}
          />
          <NavTextTach text={"Sign In"} />
          <NavButtonTach
            text={"Register"}
            onClick={() => this.props.onRouteChange("register")}
          />
        </div>
      );
    }
    if (this.props.route === "register") {
      mainSection = (
        <div className={mainSectionClass}>
          <NavButtonTach
            text={"Sandpit"}
            onClick={() => this.props.onRouteChange("sandpit")}
          />
          <NavButtonSignInTach onClick={() => this.props.onRouteChange("signIn")} />
          <NavTextTach text={"Register"} />
        </div>
      );
    }
    if (this.props.route === "sandpit") {
      mainSection = (
        <div className={mainSectionClass}>
          <NavTextTach text={this.props.user.name} />
          <NavTextTach text={`Entry Count: ${this.props.user.entries}`} />
          <NavTextTach text={"Sandpit"} />
          <NavButtonTach
            text={"Sign Out"}
            onClick={() => this.props.onRouteChange("signIn")}
          />
        </div>
      );
    }

    return (
      <nav className="flex justify-between bb b--white-10 bg-near-black">
        <LogoTach />
        {mainSection}
      </nav>
    );
  }
}

NavigationTach.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default NavigationTach;
