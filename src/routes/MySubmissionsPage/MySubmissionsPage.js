import React, { Component } from "react";
import WoodContext from "../../contexts/WoodContext";
import WoodApiService from "../../services/wood-api-service";
import { MakeMySubmissionsTable } from "./MySubmissionsPageHelpers";
import { Link } from "react-router-dom";
import { Button } from "../../components/Utils/Utils";
import { ErrorModal } from "../../components/ErrorModal/ErrorModal";
import { Section } from "../../components/Utils/Utils";
import "./MySubmissionsPage.css";

export default class MySubmissionsPage extends Component {
  static defaultProps = {
    match: { params: {} }
  };

  static contextType = WoodContext;

  componentDidMount() {
    this.context.clearError();
    WoodApiService.getAllSubmissions()
      .then(this.context.setSubmissions)
      .catch(this.context.setError);
  }

  componentWillUnmount() {
    this.context.clearWood();
  }

  renderSubmissions() {
    const { submissions } = this.context;
    return (
      <>
        <MakeMySubmissionsTable submissions={submissions} />
        <Section id="Submission-Link-Section">
          <Link to={"/new-submission"} className="Submission-Link">
            <Button>Submit your data!</Button>
          </Link>
        </Section>
      </>
    );
  }

  render() {
    const { error } = this.context;
    let description;
    if (error) {
      description =
        error.error === `Entry doesn't exist` ? (
          <ErrorModal message={"Entry does not exist, please try another."} />
        ) : (
          <p className="red">There was an error</p>
        );
    } else {
      description = this.renderSubmissions();
    }
    return <Section className="MySubmissionsPage">{description}</Section>;
  }
}
