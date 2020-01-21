import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Section } from "../../components/Utils/Utils";

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
    this.props.hasLogin(true);
    history.push(destination);
  };

  render() {
    return (
      <Section className="LoginPage">
        <h2>Login</h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
        <div className="button-container">
          <button
            className="modal-button"
            type="button"
            onClick={this.showModal}
          >
            Show credentials to test Login
          </button>
        </div>

        <CredentialsModal show={this.state.show} handleClose={this.hideModal}>
          <p>username: testuser</p>
          <p>password: Testuser1@</p>
        </CredentialsModal>
      </Section>
    );
  }
}

const CredentialsModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main credentials-modal">
        {children}
        <button onClick={handleClose}>Close</button>
      </section>
    </div>
  );
};
