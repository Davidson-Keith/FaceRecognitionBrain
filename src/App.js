import { Component } from "react";
import Navigation from "./components/navigation/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import EntryCount from "./components/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
// import "./App.css";
import "tachyons";
// import ParticlesBg from "particles-bg";
class App extends Component {
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
      route: "signIn",
      // route: "main",
      // route: "register",
      isSignedIn: "false",
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
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
    this.setState({ imageUrl: this.state.imageInput });
  };

  onRouteChange = (route) => {
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
          this.setState(Object.assign(this.state.user, { entries: user.entries }));
          // this.setState({ user: user });
        } else {
          console.log(
            "pp.updateEntriesCount().fetch - find user failed - message:",
            user
          );
        }
      });
  }

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
    if (this.state.route === "signIn") {
      return (
        <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      );
    }
    if (this.state.route === "register") {
      return (
        <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      );
    }
    return (
      <div>
        <Navigation onRouteChange={this.onRouteChange} />
        <EntryCount
          userName={this.state.user.name}
          entries={this.state.user.entries}
        />
        <ImageLinkForm
          onImageInputChange={this.onImageInputChange}
          onImageInputSubmit={this.onImageInputSubmit}
          imageInput={this.state.imageInput}
        />
        <FaceRecognition
          imageUrl={this.state.imageUrl}
          updateEntriesCount={this.updateEntriesCount}
        />
        {/* <ParticlesBg type="cobweb" num={50} bg={true} /> */}
        {/* type: "color" "ball" "lines" "thick" "circle" "cobweb" "polygon" "square"
        "tadpole" "fountain" "random" "custom" */}
      </div>
    );
  }
}

export default App;
