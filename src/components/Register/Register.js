import React from "react";
import PropTypes from 'prop-types';
import FormInput from "../forms/formInput";
import FormSubmit from "../forms/formSubmit";
import Settings from "../../Settings";

class Register extends React.Component {
  // -----
  // Props
  // -----
  // loadUser: PropTypes.func.isRequired,
  // onRouteChange: PropTypes.func.isRequired

  constructor(props) {
    super(props);
    this.state = {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
    };
  }

  onNameChange = (event) => {
    this.setState({registerName: event.target.value});
  };

  onEmailChange = (event) => {
    this.setState({registerEmail: event.target.value});
  };

  onPasswordChange = (event) => {
    this.setState({registerPassword: event.target.value});
  };

  onSubmitRegister = (event) => {
    event.preventDefault();
    console.log("Register.onSubmitRegister() - this.state:", this.state);
    // fetch("http://localhost:3000/register", {
    fetch(Settings.hostURL + "/register", {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          console.log("response.user:", user);
          this.props.loadUser(user);
          this.props.onRouteChange("main");
        } else {
          console.log("register failed - message:", user);
        }
      })
      .catch(console.log);
  };

  render() {
    return (
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
        <main className="pa4 black-80">
          <div className="measure center">
            <form>
              <fieldset id="register" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">
                    Name
                  </label>
                  <FormInput name="name" onChange={this.onNameChange}/>
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
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
              <FormSubmit value="Register" onClick={this.onSubmitRegister}/>
            </form>
          </div>
        </main>
      </article>
    );
  }
}

Register.propTypes = {
  loadUser: PropTypes.func.isRequired,
  onRouteChange: PropTypes.func.isRequired
};

export default Register;
