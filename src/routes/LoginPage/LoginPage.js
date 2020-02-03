import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Section, Button } from "../../components/Utils/Utils";

export default class LoginPage extends Component {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    this.props.setLogin(true);
    history.push(destination);
  };

  //show button if user is not logged in
  renderTestCredentialsButton() {
    if (this.props.hasLogin) {
      return "";
    }
    return (
      <Button className="modal-button" type="button" onClick={this.showModal}>
        Show credentials to test Login
      </Button>
    );
  }

  render() {
    return (
      <Section className="LoginPage">
          {this.renderTestCredentialsButton()}
        <h2>Login</h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />

        <CredentialsModal show={this.state.show} handleClose={this.hideModal} />
      </Section>
    );
  }
}

const CredentialsModal = ({ handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main credentials-modal">
        <p>username: testuser</p>
        <p>password: Testuser1@</p>
        <Button onClick={handleClose}>Close</Button>
      </section>
    </div>
  );
};
