import React from "react";
import PropTypes from "prop-types";
import {Button, Form, FormGroup, Input, Label, FormText, FormFeedback} from "reactstrap";
import '../Forms.css';

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
      validate: {
        emailState: "",
      },
    };
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  };

  onEmailChange = (event) => {
    this.validateEmail(event);
    this.setState({signInEmail: event.target.value});
  };

  validateEmail = (event) => {
    // WARNING: Don't use this regex for emails, it is a simplified version.
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let {validate} = this.state;
    if (emailRegex.test(event.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({validate});
  };

  onSubmitSignIn = () => {
    console.log("SignIn.onSubmitSignIn() - this.state:", this.state);
    fetch("http://localhost:3000/signin", {
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
          console.log("SignIn.onSubmitSignIn().fetch - response.user:", user);
          this.props.loadUser(user);
          this.props.onRouteChange("main");
        } else {
          console.log(
            "SignIn.onSubmitSignIn().fetch - login failed - message:",
            user
          );
          this.setState({signInErrorMessage: user});
        }
      });
  };

  render() {
    const {onRouteChange} = this.props;
    // const { formData } = this.state;
    return (
      <div className="Forms">
        <h2>Sign In</h2>
        <Form className="form" onSubmit={this.onSubmitSignIn}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="joe@blogs.com"
              value={this.state.signInEmail}
              valid={this.state.validate.emailState === "has-success"}
              invalid={this.state.validate.emailState === "has-danger"}
              onChange={this.onEmailChange}
            />
            <FormFeedback>
              Invalid email address format.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
              value={this.state.signInPassword}
              onChange={this.onPasswordChange}
            />
            <FormFeedback>
              Your password must have at least 1 character. Security is taken seriously here.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Button>
              Sign In
            </Button>
          </FormGroup>
          <FormGroup>
            <div className="register-link-div">
              <p
                href="#0"
                className="register-link"
                onClick={() => onRouteChange("register")}
              >
                Register
              </p>
            </div>
          </FormGroup>
        </Form>
      </div>

      //         {/*  Sign In*/}
      //         {/*</button>*/}
      //         <div className="">
      //           <input
      //             className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
      //             type="submit"
      //             value="Sign In"
      //             onClick={this.onSubmitSignIn}
      //           />
      //         </div>
      //         <div className="lh-copy mt3 grow pointer">
      //           <p
      //             href="#0"
      //             className="f6 link dim black db"
      //             onClick={() => onRouteChange("register")}
      //           >
      //             Register
      //           </p>
      //         </div>
      //         {/*</Form>*/}
      //       </div>
      //     </main>
      //   </article>
    );
  }
}

SignIn.propTypes = {
  loadUser: PropTypes.func.isRequired,
  onRouteChange: PropTypes.func.isRequired,
};
