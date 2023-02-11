import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  console.log("imageUrl: ", imageUrl);
  let imgTag = "";
  if (imageUrl) {
    imgTag = (
      <img
        id="imageID"
        alt="detect"
        src={imageUrl}
        width="500px"
        // height="auto"
      ></img>
    );
  }
  return (
    // <div className="pa2 tc ">
    <div
      className="center ma tc"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="absolute mt2">
        {imgTag}
        <div
          className="boundingBox"
          style={{
            top: box.top,
            right: box.right,
            bottom: box.bottom,
            left: box.left,
          }}
        ></div>
      </div>
    </div>
  );

  // return (
  //   <div className="center pa4">
  //     <img
  //       alt="test"
  //       src={this.props.imageUrl}
  //     ></img>
  //   </div>
  // );
};

export default FaceRecognition;

// .box {
//   position: absolute;
//   box-shadow: 0 0 0 3px #149df2 inset;
//   inset: 20px 40px 30px 10px;
// }

// .imageContainer {
//   position: absolute;
//   margin-top: 50px;
//   margin-left: 100px;
//   text-align: center;
//   width: "500px";
//   /* height: "auto"; */
// }
