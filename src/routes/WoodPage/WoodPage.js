import React, { Component } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import WoodContext from "../../contexts/WoodContext";
import WoodApiService from "../../services/wood-api-service";
import { Section } from "../../components/Utils/Utils";
import { WoodDescription, MakeSubmissionsTable } from './WoodPageHelpers.js'
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
  
    if (submissions) {
      this.makeDataPoints(submissions, 'e_cross')
    }
    return (
      <>
        {/* <div className='WoodPage__image' style={{backgroundImage: `url(${Wood.image})`}} /> */}
        <h2>{wood.common_name}</h2>
        <WoodDescription wood={wood} />
        <MakeSubmissionsTable submissions={submissions} />
      </>
    );
  }

  makeDataPoints = (data, columnName) => {

    // if (submissions.length) {
    //   let subObj = Object.keys(submissions[0]);
    //   const filteredArray = subObj.filter(
    //     obj => obj !== "user" && obj !== "tw_id"
    //   );
    //   let header = filteredArray;

    // arrAverages = header.map(item => {

    // })
    let sumVal = 0;
    for ( let i = 0; i < data.length; i++) {
      sumVal += parseInt(data[i][columnName])
    }
    console.log(sumVal);
  }

  render() {
    const { error, wood } = this.context;
    let description;
    if (error) {
      description =
        error.error === `Wood doesn't exist` ? (
          <p className="red">Wood not found</p>
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

