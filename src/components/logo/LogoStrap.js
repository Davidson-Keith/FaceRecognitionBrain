import React from "react";
// import Tilt from "react-parallax-tilt";
import brain from "./Brain2-52.png";
// import './LogoTach.css';

const LogoTach = () => {
  return (
    // <Tilt
    //   // className="br2 shadow-2"
    //   style={{
    //     height: "150px",
    //     width: "150px",
    //     // backgroundColor: "darkgreen",
    //   }}
    // >
    <div className="flex items-center pa2">
      <img className="dib h2 w2" src={brain} alt="logo" />
    </div>
    // </Tilt>
    // <Tilt>
    //   <div className="ma4 mt0"></div>
    // </Tilt>
  );
};

export default LogoTach;
