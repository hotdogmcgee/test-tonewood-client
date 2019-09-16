import React from "react";
import { Link } from "react-router-dom";
import "./SubmissionSuccess.css";

export default class SubmissionSuccess extends React.Component {
  static defaultProps = {
    handleNewSubmitClick: () => {}
  };

  handleClick = e => {
    e.preventDefault();
    this.props.handleNewSubmitClick();
  };

  render() {
    return (
      <>
        <h1>Submission successful!</h1>
        <Link to={"/"} className="go-back-link link">
          Go back to main page
        </Link>
        <Link
          to={"/new-submission"}
          className="new-submission-link link"
          onClick={this.handleClick}
        >
          Enter a new submission
        </Link>
      </>
    );
  }
}
