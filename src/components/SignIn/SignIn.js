import React from "react";
import PropTypes from "prop-types";
import FormInput from "../forms/formInput";
import FormSubmit from "../forms/formSubmit";
import Settings from "../../Settings";

export default class SignIn extends React.Component {
  // -----
  // Props
  // -----
  // loadUser: PropTypes.func.isRequired,
  // onRouteChange: PropTypes.func.isRequired

  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  };

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  };

  onSubmitSignIn = (event) => {
    event.preventDefault();
    console.log("SignIn.onSubmitSignIn() - this.state:", this.state);
    // fetch("http://localhost:3000/signin", {
    fetch(Settings.hostURL + "/signin", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        // if user exists
        if (user.id) {
          console.log("response.user:", user);
          this.props.loadUser(user);
          this.props.onRouteChange("main");
        } else {
          console.log("login failed - message:", user);
        }
      })
      .catch(console.log);
  };

  render() {
    const {onRouteChange} = this.props;
    // const { formData } = this.state;
    return (
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 black-80">
          <div className="measure center">
            <form>
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email">
                    Email
                  </label>
                  <FormInput name="email" onChange={this.onEmailChange}/>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <FormInput name="password" onChange={this.onPasswordChange}/>
                </div>
                {/* <label className="pa0 ma0 lh-copy f6 pointer">
                <input type="checkbox" /> Remember me
              </label> */}
              </fieldset>
              <FormSubmit value="Sign In" onClick={this.onSubmitSignIn}/>
              <div className="lh-copy mt3 grow pointer">
                <p
                  href="#0"
                  className="f6 link dim black db"
                  onClick={() => onRouteChange("register")}
                >
                  Register
                </p>
              </div>
            </form>
          </div>
        </main>
      </article>
    );
  }
}

SignIn.propTypes = {
  loadUser: PropTypes.func.isRequired,
  onRouteChange: PropTypes.func.isRequired,
};
