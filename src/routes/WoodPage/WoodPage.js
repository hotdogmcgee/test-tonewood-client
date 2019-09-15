import React, { Component } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import WoodContext from "../../contexts/WoodContext";
import WoodApiService from "../../services/wood-api-service";
import { Section } from "../../components/Utils/Utils";
import { WoodDescription, MakeSubmissionsTable, AverageEach } from './WoodPageHelpers.js'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Utils/Utils'
import  URLError  from '../../components/Validation/URLError'
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
    const { wood, submissions } = this.context;
    // const { woodId } = this.props.match.params;

    // if (!wood && woodId !== undefined) {
    //   const message='This entry does not exist'
    //   return <URLError message={message}/>
    // } 
    if (submissions) {
      const columnNames = [
        'density',
        'e_long',
        'e_cross',
        'velocity_sound_long',
        'radiation_ratio',
        'sample_length',
        'sample_width',
        'sample_thickness',
        'sample_weight_grams',
        'peak_hz_long_grain',
        'peak_hz_cross_grain',
      ]
      AverageEach(submissions, columnNames)

    }
    return (
      <>
        {/* <div className='WoodPage__image' style={{backgroundImage: `url(${Wood.image})`}} /> */}
        <h2>{wood.common_name}</h2>
        <WoodDescription wood={wood} />
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
          <URLError message={error.error} />
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

