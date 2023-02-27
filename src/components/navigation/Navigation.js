import React from "react";
import Logo from "../logo/Logo";

const Navigation = ({ onRouteChange }) => {
  // -----
  // Props
  // -----
  // onRouteChange: PropTypes.func.isRequired

  return (
    <nav
      className="pt3 mh3"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>
        <Logo />
      </div>
      <div
        className="f3 link dim black underline pa3 grow pointer"
        onClick={() => onRouteChange("signIn")}
      >
        Sign Out
      </div>
    </nav>
  );
};

export default Navigation;
