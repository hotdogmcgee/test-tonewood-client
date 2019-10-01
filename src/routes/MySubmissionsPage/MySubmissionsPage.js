import React, { Component } from "react";
import WoodContext from "../../contexts/WoodContext";
import WoodApiService from "../../services/wood-api-service";
import { MakeMySubmissionsTable } from './MySubmissionsPageHelpers'
import { Link } from "react-router-dom";
import { Button } from "../../components/Utils/Utils";
import { ErrorModal } from "../../components/ErrorModal/ErrorModal";
import { Section } from "../../components/Utils/Utils";

export default class MySubmissionsPage extends Component {
  static defaultProps = {
    match: { params: {} }
  };

  static contextType = WoodContext;

  componentDidMount() {
    const user_id = 2;
    this.context.clearError();
    WoodApiService.getWoods()
    .then(this.context.setWoodNames)
    .catch(this.context.setError);
    WoodApiService.getAllSubmissions(user_id)
      .then(this.context.setSubmissions)
      .catch(this.context.setError);
  }

  componentWillUnmount() {
    this.context.clearWood();
  }

  renderSubmissions() {
    const { submissions, columnNamesToAverage } = this.context;
    return (
      <>
        {/* <Section id="Average-Data-Section">
              <h2>Averages</h2>
              {submissions && (
                <AverageEach submissions={submissions} columnNames={columnNamesToAverage} />
              )}
    
    
            </Section> */}

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
