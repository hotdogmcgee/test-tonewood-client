import React from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import "./Header.css";

export default class Header extends React.Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.props.hasLogin(false);
  };

  renderLogoutLink() {
    return (
      <div className="Header__logged-in">
        <Link onClick={this.handleLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
      </div>
    );
  }

  render() {
    return (
      <>
        <nav className="Header">
          <h1>
            <Link to="/"> Tonewoods</Link>
          </h1>
          <span className="Header__tagline--wide">
            Help build the tonewood project.
          </span>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
        <span className="Header__tagline--narrow">
          Help build the tonewood project.
        </span>
      </>
    );
  }
}
