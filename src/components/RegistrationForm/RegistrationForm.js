import React, { Component } from "react";
import { Button, Input, Required } from "../Utils/Utils";
import AuthApiService from "../../services/auth-api-service";
import ValidationError from "../../Validation/ValidationError";
import "./RegistrationForm.css";

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      fullName: "",
      userName: "",
      password: "",
      repeatPassword: "",
      email: "",
      formValid: false,
      fullNameValid: false,
      userNameValid: false,
      passwordValid: false,
      emailValid: false,
      passwordMatch: false,
      validationMessages: {
        fullName: "",
        userName: "",
        password: "",
        repeatPassword: "",
        email: ""
      }
    };
  }
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  formValid() {
    const {
      fullNameValid,
      userNameValid,
      passwordValid,
      emailValid,
      passwordMatch
    } = this.state;
    this.setState({
      formValid:
        fullNameValid &&
        userNameValid &&
        passwordValid &&
        emailValid &&
        passwordMatch
    });
  }

  updateFullName(fullName) {
    this.setState({ fullName }, () => {
      this.validateFullName(fullName);
    });
  }

  updateUserName(userName) {
    this.setState({ userName }, () => {
      this.validateUserName(userName);
    });
  }

  updatePassword(password) {
    this.setState({ password }, () => {
      this.validatePassword(password);
    });
  }

  updateRepeatPassword(repeatPassword) {
    this.setState({ repeatPassword }, () => {
      this.matchPasswords(repeatPassword);
    });
  }

  updateEmail(email) {
    this.setState({ email }, () => {
      this.validateEmail(email);
    });
  }

  validateFullName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.fullName = "Full name is required";
      hasError = true;
    } else {
      if (
        fieldValue.length < 3 ||
        !fieldValue.match(new RegExp(/^\b(?!.*?\s{2})[A-Za-z ]{1,50}\b$/))
      ) {
        fieldErrors.fullName =
          "Name must be at least 3 characters long, using letters A-Z";
        hasError = true;
      } else {
        fieldErrors.fullName = "";
        hasError = false;
      }
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        fullNameValid: !hasError
      },
      this.formValid
    );
  }

  validateUserName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.userName = "User name is required";
      hasError = true;
    } else {
      if (
        fieldValue.length < 3 ||
        !fieldValue.match(new RegExp(/^[a-zA-Z]+$/))
      ) {
        fieldErrors.userName =
          "Name must be at least 3 characters long, using letters A-Z";
        hasError = true;
      } else {
        fieldErrors.userName = "";
        hasError = false;
      }
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        userNameValid: !hasError
      },
      this.formValid
    );
  }

  validatePassword(fieldValue) {
    const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();

    if (fieldValue.length === 0) {
      fieldErrors.password = "Password required";
      hasError = true;
    } else {
      if (fieldValue.length < 8 || fieldValue.length > 72) {
        fieldErrors.password =
          "Password must be between 8 and 72 characters long.";
        hasError = true;
      } else {
        if (!fieldValue.match(REGEX_UPPER_LOWER_NUMBER_SPECIAL)) {
          fieldErrors.password =
            "Password must contain 1 upper case, lower case, number and special character";
          hasError = true;
        } else {
          fieldErrors.password = "";
          hasError = false;
        }
      }
    }
    this.setState(
      {
        validationMessages: fieldErrors,
        passwordValid: !hasError
      },
      this.formValid
    );
  }
  validateEmail(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.email = "Email is required";
      hasError = true;
    } else {
      if (
        fieldValue.length < 3 ||
        !fieldValue.match(
          new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/)
        )
      ) {
        fieldErrors.email = "Please enter a valid email";
        hasError = true;
      } else {
        fieldErrors.email = "";
        hasError = false;
      }
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        emailValid: !hasError
      },
      this.formValid
    );
  }

  matchPasswords(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    const password = this.state.password;
    if (fieldValue !== password) {
      fieldErrors.repeatPassword = "Passwords do not match!";
      hasError = true;
    } else {
      fieldErrors.repeatPassword = "";
      hasError = false;
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        passwordMatch: !hasError
      },
      this.formValid
    );
  }

  handleSubmit = ev => {
    ev.preventDefault();
    const {
      full_name,
      email,
      user_name,
      password,
      repeat_password
    } = ev.target;

    this.setState({ error: null });

    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value,
      full_name: full_name.value,
      email: email.value
    })
      .then(user => {
        full_name.value = "";
        email.value = "";
        user_name.value = "";
        password.value = "";
        repeat_password.value = "";
        email.value = "";
        this.props.onRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="RegistrationForm" onSubmit={e => this.handleSubmit(e)}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="full_name">
          <label htmlFor="RegistrationForm__full_name">
            Full name <Required />
          </label>
          <Input
            name="full_name"
            type="text"
            required
            id="RegistrationForm__full_name"
            autoComplete="off"
            onChange={e => this.updateFullName(e.target.value)}
          ></Input>
          <ValidationError
            hasError={!this.state.fullNameValid}
            message={this.state.validationMessages.fullName}
          />
        </div>
        <div className="user_name">
          <label htmlFor="RegistrationForm__user_name">
            User name <Required />
          </label>
          <Input
            name="user_name"
            type="text"
            required
            id="RegistrationForm__user_name"
            autoComplete="off"
            onChange={e => this.updateUserName(e.target.value)}
          ></Input>
          <ValidationError
            hasError={!this.state.userNameValid}
            message={this.state.validationMessages.userName}
          />
        </div>
        <div className="password">
          <label htmlFor="RegistrationForm__password">
            Password <Required />
          </label>
          <Input
            name="password"
            type="password"
            required
            id="RegistrationForm__password"
            onChange={e => this.updatePassword(e.target.value)}
          ></Input>
          <ValidationError
            hasError={!this.state.passwordValid}
            message={this.state.validationMessages.password}
          />
        </div>
        <div className="repeat_password">
          <label htmlFor="RegistrationForm__repeat_password">
            Confirm password <Required />
          </label>
          <Input
            name="repeat_password"
            type="password"
            required
            id="RegistrationForm__repeat-password"
            autoComplete="off"
            onChange={e => this.updateRepeatPassword(e.target.value)}
          ></Input>
          <ValidationError
            hasError={!this.state.passwordMatch}
            message={this.state.validationMessages.repeatPassword}
          />
        </div>
        <div className="email">
          <label htmlFor="RegistrationForm__email">
            Email <Required />
          </label>
          <Input
            name="email"
            type="text"
            required
            id="RegistrationForm__email"
            onChange={e => this.updateEmail(e.target.value)}
          ></Input>
          <ValidationError
            hasError={!this.state.emailValid}
            message={this.state.validationMessages.email}
          />
        </div>
        <Button
          className={!this.state.formValid ? "no-click" : ""}
          type="submit"
          disabled={!this.state.formValid}
        >
          Register
        </Button>
      </form>
    );
  }
}
