import React from "react";
import Logo from "./logo/Logo";
// import EntryCount from "../EntryCount";
import PropTypes from "prop-types";
import NavText from "./NavText";
import NavButton from "./navButtons/NavButton";
import NavButtonSignIn from "./navButtons/NavButtonSignIn";
import "tachyons"; // Replace all CSS files with tachyons CSS framework.

class Navigation extends React.Component {
  // -----
  // Props
  // -----
  // onRouteChange: PropTypes.func.isRequired
  // route: PropTypes.string.isRequired
  // user: PropTypes.object.isRequired

  render() {
    const userNameText = <NavText text={this.props.user.name}/>
    const entryCountText = <NavText text={`Entry Count: ${this.props.user.entries}`}/>
    const signInText = <NavText text={"Sign In"}/>
    const registerText = <NavText text={"Register"}/>
    const sandpitText = <NavText text={"Sandpit"}/>
    const sandpitButton = (
      <NavButton
        text={"Sandpit"}
        onClick={() => this.props.onRouteChange("sandpit")}
      />
    )
    const signInButton = <NavButtonSignIn onClick={() => this.props.onRouteChange("signIn")}/>
    const signOutButton = (
      <NavButton
        text={"Sign Out"}
        onClick={() => this.props.onRouteChange("signIn")}
      />
    )
    const registerButton = (
      <NavButton
        text={"Register"}
        onClick={() => this.props.onRouteChange("register")}
      />
    )


    let mainSection;
    const mainSectionClass = "flex-grow pl3 pt3 pb3 flex items-center";
    if (this.props.route === "main") {
      mainSection = (
        <div className={mainSectionClass}>
          {userNameText}
          {entryCountText}
          {/*{sandpitButton}*/}
          {signOutButton}
        </div>
      );
    }
    if (this.props.route === "signIn") {
      mainSection = (
        <div className={mainSectionClass}>
          {/*{sandpitButton}*/}
          {signInText}
          {registerButton}
        </div>
      );
    }
    if (this.props.route === "register") {
      mainSection = (
        <div className={mainSectionClass}>
          {/*{sandpitButton}*/}
          {signInButton}
          {registerText}
        </div>
      );
    }
    if (this.props.route === "sandpit") {
      mainSection = (
        <div className={mainSectionClass}>
          {userNameText}
          {entryCountText}
          {/*{sandpitText}*/}
          {signOutButton}
        </div>
      );
    }

    return (
      <nav className="flex justify-between bb b--white-10 bg-near-black">
        <Logo/>
        {mainSection}
      </nav>
    );
  }
}

Navigation.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default Navigation;
