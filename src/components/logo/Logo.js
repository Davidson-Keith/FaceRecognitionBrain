import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './Brain.png';
// import './Logo.css';

const Logo = () => {
  return (
    <Tilt
      // className="br2 shadow-2"
      style={{
        height: "150px",
        width: "150px",
        // backgroundColor: "darkgreen",
      }}
    >
      <div>
        <img src={brain} alt='logo' />
      </div>
    </Tilt>
    // <Tilt>
    //   <div className="ma4 mt0"></div>
    // </Tilt>
  );
};

export default Logo;