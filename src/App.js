import { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Sandpit from "./components/Sandpit";
import "tachyons"; // Replace all CSS files with tachyons CSS framework.
// import "./App.css";
// import ParticlesBg from "particles-bg";
export default class App extends Component {
  // -----
  // Props
  // -----
  // NA - App is the root Component.

  constructor() {
    console.log("App.constructor called.");
    super();
    this.state = {
      imageInput: "",
      imageUrl: "",
      imageError: false,
      // route: "signIn",
      // route: "main",
      // route: "register",
      route: "sandpit",
      isSignedIn: "false",
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
      cssFramework: "tachyons",
      // cssFramework: "reactstrap",
    };
    this.setBodyCSSClassName();
  }

  setBodyCSSClassName() {
    document.body.className = "w-100 ma0 sans-serif";
  }

  componentDidMount() {
    // test code just to start with an image.
    // const url =
    //   "https://purneauniversity.org/wp-content/uploads/2022/12/JC-.png";
    // // "https://images.immediate.co.uk/production/volatile/sites/3/2021/09/daniel-craig-007.jpg-303a730.png";
    // this.setState({
    //   input: url,
    //   imageUrl: url,
    // });
  }

  onImageInputChange = (event) => {
    this.setState({ imageInput: event.target.value });
  };

  onImageInputSubmit = () => {
    console.log("App.onImageInputSubmit - state:", this.state);
    this.doesImageExist(this.state.imageInput).then((res) => {
      if (res) {
        console.log(
          "App.onImageInputSubmit - image exists:",
          this.state.imageInput
        );
        this.setState({
          imageUrl: this.state.imageInput,
          imageError: false,
        });
      } else {
        console.log(
          "App.onImageInputSubmit - image DOES NOT exists:",
          this.state.imageInput
        );
        this.setState({
          imageUrl: this.state.imageInput,
          imageError: true,
        });
      }
    });
    console.log(this.state);
  };

  doesImageExist = (url) => {
    console.log("App.doesImageExist");
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        console.log("App.doesImageExist - image exists:", url);
        resolve(true);
      };
      img.onerror = () => {
        console.log("App.doesImageExist - image DOES NOT exists:", url);
        resolve(false);
      };
    });
  };

  onRouteChange = (route) => {
    console.log("App.onRouteChange - route:", route);
    this.setState({ route: route });
  };

  updateEntriesCount = () => {
    console.log("App.updateEntriesCount() - this.state:", this.state);
    fetch("http://localhost:3000/updateEntriesCount", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          console.log("pp.updateEntriesCount().fetch - response.user:", user);
          this.setState(
            Object.assign(this.state.user, { entries: user.entries })
          );
          // this.setState({ user: user });
        } else {
          console.log(
            "pp.updateEntriesCount().fetch - find user failed - message:",
            user
          );
        }
      });
  };

  loadUser = (data) => {
    this.setState({
      user: data,
      isSignedIn: true,
      imageInput: "",
      imageUrl: "",
    });
    // console.log('App.loadUser(data) - this.state:', this.state); // Doesn't show update to state, need to log from render()
  };

  render() {
    console.log("App.render() - this.state:", this.state);

    if (this.state.cssFramework === "tachyons") {
      if (this.state.route === "sandpit") {
        return (
          <div>
            <Navigation
              onRouteChange={this.onRouteChange}
              route={this.state.route}
              user={this.state.user}
            />
            <Sandpit
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        );
      }
      if (this.state.route === "signIn") {
        return (
          <div>
            <Navigation
              onRouteChange={this.onRouteChange}
              route={this.state.route}
              user={this.state.user}
            />
            <SignIn
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        );
      }
      if (this.state.route === "register") {
        return (
          <div>
            <Navigation
              onRouteChange={this.onRouteChange}
              route={this.state.route}
              user={this.state.user}
            />
            <Register
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        );
      }
      return (
        <div>
          <Navigation
            onRouteChange={this.onRouteChange}
            route={this.state.route}
            user={this.state.user}
          />
          {/* <EntryCount
          userName={this.state.user.name}
          entries={this.state.user.entries}
        /> */}
          <ImageLinkForm
            onImageInputChange={this.onImageInputChange}
            onImageInputSubmit={this.onImageInputSubmit}
            imageInput={this.state.imageInput}
          />
          <FaceRecognition
            imageUrl={this.state.imageUrl}
            imageError={this.state.imageError}
            updateEntriesCount={this.updateEntriesCount}
          />
          {/* <ParticlesBg type="cobweb" num={50} bg={true} /> */}
          {/* type: "color" "ball" "lines" "thick" "circle" "cobweb" "polygon" "square"
        "tadpole" "fountain" "random" "custom" */}
        </div>
      );
    }

    if (this.state.cssFramework === "reactstrap") {
      if (this.state.route === "sandpit") {
        return (
          <div>
            <Navigation
              onRouteChange={this.onRouteChange}
              route={this.state.route}
              user={this.state.user}
            />
            <Sandpit
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        );
      }
      if (this.state.route === "signIn") {
        return (
          <div>
            <Navigation
              onRouteChange={this.onRouteChange}
              route={this.state.route}
              user={this.state.user}
            />
            <SignIn
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        );
      }
      if (this.state.route === "register") {
        return (
          <div>
            <Navigation
              onRouteChange={this.onRouteChange}
              route={this.state.route}
              user={this.state.user}
            />
            <Register
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        );
      }
      return (
        <div>
          <Navigation
            onRouteChange={this.onRouteChange}
            route={this.state.route}
            user={this.state.user}
          />
          {/* <EntryCount
          userName={this.state.user.name}
          entries={this.state.user.entries}
        /> */}
          <ImageLinkForm
            onImageInputChange={this.onImageInputChange}
            onImageInputSubmit={this.onImageInputSubmit}
            imageInput={this.state.imageInput}
          />
          <FaceRecognition
            imageUrl={this.state.imageUrl}
            imageError={this.state.imageError}
            updateEntriesCount={this.updateEntriesCount}
          />
          {/* <ParticlesBg type="cobweb" num={50} bg={true} /> */}
          {/* type: "color" "ball" "lines" "thick" "circle" "cobweb" "polygon" "square"
        "tadpole" "fountain" "random" "custom" */}
        </div>
      );
    }
  }
}
