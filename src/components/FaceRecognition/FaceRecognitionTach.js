import React from "react";
import PropTypes from "prop-types";
import "./FaceRecognition.css";

// const FaceRecognitionTach = ({ imageUrl, box }) => {
// https://purneauniversity.org/wp-content/uploads/2022/12/JC-.png
// https://www.oscars.org/sites/oscars/files/02_loren9.jpg
// https://media.vanityfair.com/photos/615478afc1d17015c14bd905/master/pass/no-time-to-die-film-still-01.jpg
// https://samples.clarifai.com/metro-north.jpg

class FaceRecognitionTach extends React.Component {
  // -----
  // Props
  // -----
  // imageUrl: PropTypes.string.isRequired
  // imageError: PropTypes.bool.isRequired // true if imageURL is not an image
  // updateEntriesCount: PropTypes.func.isRequired // updates image calc count

  constructor(props) {
    console.log("FaceRecognitionTach.constructor(props) - props:", props);
    super(props);
    this.state = {
      box: { left: 0, top: 0, right: 0, bottom: 0 },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(
      "FaceRecognitionTach.componentDidUpdate() - this.state:",
      this.state
    );
    console.log(
      "FaceRecognitionTach.componentDidUpdate() - this.props:",
      this.props
    );
    console.log(
      "FaceRecognitionTach.componentDidUpdate() - this.prevProps:",
      prevProps
    );
    if (prevProps.imageUrl !== this.props.imageUrl) {
      if (!this.props.imageError) {
        console.log(
          "FaceRecognitionTach.componentDidUpdate() - new valid image URL, runModel called. - this.props.imageError:",
          this.props.imageError
        );
        this.runModel();
      } else {
        console.log(
          "FaceRecognitionTach.componentDidUpdate() - URL is NOT an image. - this.props.imageError:",
          this.props.imageError
        );
      }
    } else {
      console.log("prevProps.imageUrl === this.props.imageUrl");
    }
  }

  runModel = () => {
    console.log("FaceRecognitionTach.runModel()");
    // if (this.props.imageUrl & !this.props.imageError) {
    // reset box for new image so a misplaced box from the previous image doesn't sit on
    // the new image while the Clarifai model runs, which can sometimes take some time.
    this.setState({
      box: { left: 0, top: 0, right: 0, bottom: 0 },
    });
    this.runClarifaiModel();
    // }
  };

  // console.log("FaceRecognitionTach(imageUrl, box) - imageUrl, box: ", imageUrl, box);

  runClarifaiModel = () => {
    console.log(
      "FaceRecognitionTach.runClarifaiModel() - this.state this.props:",
      this.state,
      this.props
    );
    const USER_ID = "chengis";
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = "b6489c5155df49bc9ed8f81eb64d532d";
    const APP_ID = "facebrain";
    const MODEL_ID = "face-detection";
    // const Model = Clarifai.FACE_DETECT_MODEL; // This is NOT the Model ID???
    // console.log("Model: ", Model);
    // const MODEL_VERSION_ID = "45fb9a671625463fa646c3523a3087d5";
    // const IMAGE_URL = "https://samples.clarifai.com/metro-north.jpg";
    // const IMAGE_URL = this.state.imageInput;
    const IMAGE_URL = this.props.imageUrl;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id
    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        // "/versions/" +
        // MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => this.calcBox(result))
      .catch(
        (error) =>
          console.log(
            "FaceRecognitionTach.runClarifaiModel().fetch.catch(error) - error",
            error
          )
        // todo: display "Not an image" error msg instead of trying to display the image
      );
  };

  calcBox = (jsonData) => {
    console.log("FaceRecognitionTach.calcBox(jsonData) - jsonData:", jsonData);
    const clarifaiBoxData =
      JSON.parse(jsonData).outputs[0].data.regions[0].region_info.bounding_box;
    console.log(
      "FaceRecognitionTach.calcBox(jsonData) - clarifaiBoxData: ",
      clarifaiBoxData
    );
    const image = document.getElementById("imageID");
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    console.log(
      "FaceRecognitionTach.calcBox(jsonData) - Image width: ",
      imageWidth
    );
    console.log(
      "FaceRecognitionTach.calcBox(jsonData) - Image height: ",
      imageHeight
    );
    const boxData = {
      left: clarifaiBoxData.left_col * imageWidth,
      top: clarifaiBoxData.top_row * imageHeight,
      right: imageWidth - clarifaiBoxData.right_col * imageWidth,
      bottom: imageHeight - clarifaiBoxData.bottom_row * imageHeight,
    };
    console.log("FaceRecognitionTach.calcBox(jsonData) - boxData: ", boxData);
    this.setState({ box: boxData });
    this.props.updateEntriesCount();
  };

  render() {
    console.log("FaceRecognitionTach.render() - this.state", this.state);
    console.log("FaceRecognitionTach.render() - this.props:", this.props);
    const box = this.state.box;
    let imgDiv;
    if (this.props.imageUrl === "") {
      imgDiv = "";
    } else if (this.props.imageError) {
      imgDiv = <p>Entered URL is not an image</p>;
    } else {
      // if (this.props.imageUrl) {
      imgDiv = (
        <div className="absolute mt2">
          <img
            id="imageID"
            alt="Running face detection"
            src={this.props.imageUrl}
            width="500px"
            // height="auto"
          ></img>
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
      );
      // } else {
      // if there is no image URL, then we don't want an image tag at all, or it will display
      // as a lost image.
      // imgTag = "hi";
      // }
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

FaceRecognitionTach.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageError: PropTypes.bool.isRequired, // true if imageURL is not an image
  updateEntriesCount: PropTypes.func.isRequired,
};

export default FaceRecognitionTach;

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
