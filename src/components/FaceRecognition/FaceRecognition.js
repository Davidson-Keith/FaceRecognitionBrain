import React from "react";
import PropTypes from "prop-types";
import Box from './Box';
import "./FaceRecognition.css";
import Settings from "../../Settings";

/*
samples:
https://purneauniversity.org/wp-content/uploads/2022/12/JC-.png
https://www.oscars.org/sites/oscars/files/02_loren9.jpg
https://media.vanityfair.com/photos/615478afc1d17015c14bd905/master/pass/no-time-to-die-film-still-01.jpg
https://samples.clarifai.com/metro-north.jpg
*/

class FaceRecognition extends React.Component {
  // -----
  // Props
  // -----
  // imageUrl: PropTypes.string.isRequired
  // imageError: PropTypes.bool.isRequired // true if imageURL is not an image
  // updateEntriesCount: PropTypes.func.isRequired // updates image calc count

  constructor(props) {
    console.log("FaceRecognition.constructor(props) - props:", props);
    super(props);
    this.state = {
      boxes: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(
      "FaceRecognition.componentDidUpdate() - this.state:",
      this.state
    );
    console.log(
      "FaceRecognition.componentDidUpdate() - this.props:",
      this.props
    );
    console.log(
      "FaceRecognition.componentDidUpdate() - this.prevProps:",
      prevProps
    );
    if (prevProps.imageUrl !== this.props.imageUrl) {
      if (!this.props.imageError) {
        console.log(
          "FaceRecognition.componentDidUpdate() - new valid image URL, runModel called. - this.props.imageError:",
          this.props.imageError
        );
        this.runModel();
      } else {
        console.log(
          "FaceRecognition.componentDidUpdate() - URL is NOT an image. - this.props.imageError:",
          this.props.imageError
        );
      }
    } else {
      console.log("prevProps.imageUrl === this.props.imageUrl");
    }
  }

  runModel = () => {
    console.log("FaceRecognition.runModel()");
    // if (this.props.imageUrl & !this.props.imageError) {
    // reset box for new image so a misplaced box from the previous image doesn't sit on
    // the new image while the Clarifai model runs, which can sometimes take some time.
    this.setState({
      boxes: []
    });
    // this.runClarifaiModel();

    console.log("FaceRecognition.fetching...");
    // fetch("http://localhost:3000/imageURL", {
    fetch(Settings.hostURL + "/imageURL", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      // body: JSON.stringify({name: this.props.imageUrl})
      body: JSON.stringify({"url": this.props.imageUrl})
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("FaceRecognition.runModel().response:", result);
        this.calcBox(result)
      })
      .catch(console.log);
  };

  calcBox = (data) => {
    console.log("FaceRecognition.calcBox(data) - data:", data);
    const image = document.getElementById("imageID");
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    console.log("FaceRecognition.calcBox - Image width: ", imageWidth);
    console.log("FaceRecognition.calcBox - Image height: ", imageHeight);
    const regions = data.outputs[0].data.regions;
    console.log("regions: ", regions);
    const boxes = [];
    regions.forEach((region) => {
      const bounding_box = region.region_info.bounding_box;
      const boxData = {
        id: region.id,
        left: bounding_box.left_col * imageWidth,
        top: bounding_box.top_row * imageHeight,
        right: imageWidth - bounding_box.right_col * imageWidth,
        bottom: imageHeight - bounding_box.bottom_row * imageHeight,
      };
      boxes.push(boxData);
    });
    console.log('boxes:', boxes);
    this.setState({
      boxes: boxes
    });
    this.props.updateEntriesCount();
  };

  render() {
    console.log("FaceRecognition.render() - this.state", this.state);
    console.log("FaceRecognition.render() - this.props:", this.props);
    let imgDiv;
    if (this.props.imageUrl === "") {
      imgDiv = "";
    } else if (this.props.imageError) {
      imgDiv = <p>Entered URL is not an image</p>;
    } else {
      imgDiv = (
        <div className="absolute mt2">
          <img
            id="imageID"
            alt="Running face detection"
            src={this.props.imageUrl}
            width="500px"
            // height="auto"
          ></img>
          {this.state.boxes.map(box => (
            <Box
              key={box.id}
              top={box.top}
              right={box.right}
              bottom={box.bottom}
              left={box.left}
            />
          ))
          }
        </div>
      );
      console.log('imgDiv:', imgDiv);
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
        {imgDiv}
      </div>
    );
  }
}

FaceRecognition.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageError: PropTypes.bool.isRequired, // true if imageURL is not an image
  updateEntriesCount: PropTypes.func.isRequired,
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


