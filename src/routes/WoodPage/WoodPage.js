import React, { Component } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import WoodContext from "../../contexts/WoodContext";
import WoodApiService from "../../services/wood-api-service";
import { Section } from "../../components/Utils/Utils";
import {
  WoodDescription,
  MakeSubmissionsTable,
  AverageEach
} from "./WoodPageHelpers.js";
import { Link } from "react-router-dom";
import { Button } from "../../components/Utils/Utils";
import { ErrorModal } from "../../components/ErrorModal/ErrorModal";
import "./WoodPage.css";

export default class WoodPage extends Component {
  static defaultProps = {
    match: { params: {} }
  };

  static contextType = WoodContext;

  componentDidMount() {
    const { woodId } = this.props.match.params;
    this.context.clearError();
    WoodApiService.getWood(woodId)
      //update api calls with res.ok and error message
      .then(this.context.setWood)
      .catch(this.context.setError);
    WoodApiService.getWoodSubmissions(woodId)
      .then(this.context.setSubmissions)
      .catch(this.context.setError);
  }

  componentWillUnmount() {
    this.context.clearWood();
  }

  renderWood() {
    const { wood, submissions, columnNamesToAverage } = this.context;
    return (
      <>
        {/* <div className='WoodPage__image' style={{backgroundImage: `url(${Wood.image})`}} /> */}
        <h2>{wood.common_name}</h2>
        <WoodDescription wood={wood} />
        <Section id="Average-Data-Section">
          <h2>Averages</h2>
          {submissions && (
            <AverageEach submissions={submissions} columnNames={columnNamesToAverage} />
          )}


        </Section>

        <MakeSubmissionsTable submissions={submissions} />
        <Section id="Submission-Link-Section">
          <Link to={"/new-submission"} className="Submission-Link">
            <Button>Submit your data!</Button>
          </Link>
        </Section>
      </>
    );
  }

  render() {
    const { error, wood } = this.context;
    let description;
    if (error) {
      description =
        error.error === `Entry doesn't exist` ? (
          <ErrorModal message={"Entry does not exist, please try another."} />
        ) : (
          <p className="red">There was an error</p>
        );
    } else if (!wood.id) {
      description = <div className="loading" />;
    } else {
      description = this.renderWood();
    }
    return <Section className="WoodPage">{description}</Section>;
  }
}
