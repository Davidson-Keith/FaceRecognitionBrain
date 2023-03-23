import React from "react";
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormText,
  FormFeedback,
} from "reactstrap";
import '../Forms.css';

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
      validate: {
        emailState: "",
      },
    };
  }

  onNameChange = (event) => {
    this.setState({registerName: event.target.value});
  };

  onEmailChange = (event) => {
    this.validateEmail(event);
    this.setState({registerEmail: event.target.value});
  };

  onPasswordChange = (event) => {
    this.setState({registerPassword: event.target.value});
  };

  validateEmail = (event) => {
    // WARNING: Don't use this regex for emails, it is a simplified version.
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let {validate} = this.state;
    if (emailRegex.test(event.target.value)) {
      validate.emailState = "has-success";
      // this.setState({registerEmail: event.target.value});
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({validate});
  };

  onSubmitRegister = () => {
    console.log("Register.onSubmitRegister() - this.state:", this.state);
    fetch("http://localhost:3000/register", {
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
        if (user) {
          console.log(
            "Register.onSubmitRegister().fetch - response.user:",
            user
          );
          this.props.loadUser(user);
          this.props.onRouteChange("main");
        }
      });
  };

  render() {
    return (
      <div className="Forms">
        <h2>Register</h2>
        <Form className="form" onSubmit={this.onSubmitRegister}>
          <FormGroup>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Joe Blogs"
              value={this.state.registerName}
              onChange={this.onNameChange}
            />
            <FormFeedback>
              Your name must have at least 1 character.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="joe@blogs.com"
              value={this.state.registerEmail}
              valid={this.state.validate.emailState === "has-success"}
              invalid={this.state.validate.emailState === "has-danger"}
              onChange={this.onEmailChange}
            />
            <FormFeedback>
              This doesn't have to be a real email address, but it must pass an email regex.
            </FormFeedback>
            {/*<FormText>Your username is most likely your email.</FormText>*/}
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
              value={this.state.registerPassword}
              onChange={this.onPasswordChange}
            />
            <FormFeedback>
              Your password must have at least 1 character. Security is taken seriously here.
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Button>
              Register
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  loadUser: PropTypes.func.isRequired,
  onRouteChange: PropTypes.func.isRequired
};

export default Register;
