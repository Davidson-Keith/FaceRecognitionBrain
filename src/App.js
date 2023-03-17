import { Component } from "react";

import NavigationStrap from "./components/navigation/Navigation";
import ImageLinkFormStrap from "./components/ImageLinkForm";
import FaceRecognitionStrap from "./components/FaceRecognition/FaceRecognition";
import SignInStrap from "./components/SignIn/SignIn";
import RegisterStrap from "./components/Register/Register";

import Sandpit from "./components/Sandpit";

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
      route: "signIn",
      // route: "main",
      // route: "register",
      // route: "sandpit",
      isSignedIn: "false",
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
    this.setBodyCSSClassName();
  }

  setBodyCSSClassName() {
    // document.body.className = "w-100 ma0 sans-serif";
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
      if (this.state.route === "sandpit") {
        return (
          <div>
            <NavigationStrap
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
            <NavigationStrap
              onRouteChange={this.onRouteChange}
              route={this.state.route}
              user={this.state.user}
            />
            <SignInStrap
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        );
      }
      if (this.state.route === "register") {
        return (
          <div>
            <NavigationStrap
              onRouteChange={this.onRouteChange}
              route={this.state.route}
              user={this.state.user}
            />
            <RegisterStrap
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
            />
          </div>
        );
      }
      return (
        <div>
          <NavigationStrap
            onRouteChange={this.onRouteChange}
            route={this.state.route}
            user={this.state.user}
          />
          <ImageLinkFormStrap
            onImageInputChange={this.onImageInputChange}
            onImageInputSubmit={this.onImageInputSubmit}
            imageInput={this.state.imageInput}
          />
          <FaceRecognitionStrap
            imageUrl={this.state.imageUrl}
            imageError={this.state.imageError}
            updateEntriesCount={this.updateEntriesCount}
          />
        </div>
      );
  }
}
