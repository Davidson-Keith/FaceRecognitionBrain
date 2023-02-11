import { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import Rank from "./components/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
// import Clarifai from "clarifai";
// import "./App.css";
import "tachyons";
// import ParticlesBg from "particles-bg";
class App extends Component {
  constructor() {
    console.log("App.constructor called.");
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      // signedIn: "false",
      route: "signIn",
      // route: "main",
      // route: "register",
    };
  }

  componentDidMount() {
    // test code just to start with an image.
    // this.setState({ input: 'https://samples.clarifai.com/metro-north.jp' });
    const url =
      "https://purneauniversity.org/wp-content/uploads/2022/12/JC-.png";
    // "https://images.immediate.co.uk/production/volatile/sites/3/2021/09/daniel-craig-007.jpg-303a730.png";
    this.setState({
      input: url,
      imageUrl: url,
    });
    // this.onSubmit();
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
      box: { left: 0, top: 0, right: 0, bottom: 0 },
    });
    // const { input, imageUrl } = this.state;
    console.log("click: ", this.state.input);
    this.runClarifaiModel();
  };

  runClarifaiModel = () => {
    const USER_ID = "chengis";
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = "b6489c5155df49bc9ed8f81eb64d532d";
    const APP_ID = "facebrain";
    const MODEL_ID = "face-detection";
    // const Model = Clarifai.FACE_DETECT_MODEL; // This is NOT the Model ID???
    // console.log("Model: ", Model);
    // const MODEL_VERSION_ID = "45fb9a671625463fa646c3523a3087d5";
    // const IMAGE_URL = "https://samples.clarifai.com/metro-north.jpg";
    const IMAGE_URL = this.state.input;

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
      .catch((error) => console.log("error", error));
  };

  calcBox = (jsonData) => {
    console.log("calcBox called: ", jsonData);
    // console.log(data);
    const clarifaiBoxData =
      JSON.parse(jsonData).outputs[0].data.regions[0].region_info.bounding_box;
    console.log("clarifaiBoxData: ", clarifaiBoxData);
    const image = document.getElementById("imageID");
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    console.log("Image width: ", imageWidth);
    console.log("Image height: ", imageHeight);
    const boxData = {
      left: clarifaiBoxData.left_col * imageWidth,
      top: clarifaiBoxData.top_row * imageHeight,
      right: imageWidth - clarifaiBoxData.right_col * imageWidth,
      bottom: imageHeight - clarifaiBoxData.bottom_row * imageHeight,
    };
    console.log("boxData: ", boxData);
    this.setState({ box: boxData });
  };

  // onSignInChange = (signedIn) => {
  //   this.setState({ signedIn: signedIn });
  //   if (signedIn === "true") {
  //     this.setState({ route: "main" });
  //   } else {
  //     this.setState({ route: "signIn" });
  //   }
  // };

  onRouteChange = (route) => {
    this.setState({ route: route});
  };

  render() {
    if (this.state.route === "signIn") {
      return <SignIn onRouteChange={this.onRouteChange} />;
    }
    if (this.state.route === "register") {
      return <Register onRouteChange={this.onRouteChange} />;
    }
    return (
      <div>
        <Navigation onRouteChange={this.onRouteChange} />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
          input={this.state.input}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
        {/* <ParticlesBg type="cobweb" num={50} bg={true} /> */}
        {/* type: "color" "ball" "lines" "thick" "circle" "cobweb" "polygon" "square"
        "tadpole" "fountain" "random" "custom" */}
      </div>
    );
  }
}

export default App;

// {isSignIn ? (
//   <SignIn onSignInChange={this.onSignInChange} />
// ) : (
//   isRegister ? (
//     <Register />
//   ) : (
