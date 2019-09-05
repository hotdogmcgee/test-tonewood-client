import React, { Component } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import WoodContext from "../../contexts/WoodContext";
import WoodApiService from "../../services/wood-api-service";
import { Hyph, Section } from "../../components/Utils/Utils";

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
    return (
      <>
        {/* <div className='WoodPage__image' style={{backgroundImage: `url(${Wood.image})`}} /> */}
        <h2>{wood.common_name}</h2>
        <WoodDescription wood={wood} />
        <MakeSubmissionsTable submissions={submissions} />
      </>
    );
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

function WoodDescription({ wood }) {
  return (
    <>
      <p className="WoodPage__description">{wood.genus}</p>
      <p className="WoodPage__description">{wood.species}</p>
    </>
  );
}

// function WoodSubmissions({ submissions = [] }) {
//   return (
//     <ul className='WoodPage__submissions-list'>
//       {submissions.map(sub =>
//         <li key={sub.id} className='WoodPage__sub'>
//           {/* <p className='WoodPage__sub-data'>
//             {/* need to update data */}
//             {/* {sub.e_long} */}
//           {/* </p>
//         <p className="WoodPage__sub-user">
//           {sub.user.email}
//         </p> */}

//         </li>
//       )
//       }
//     </ul>
//   )
// }

function MakeSubmissionsTable({ submissions = [] }) {
  const tableData = renderTableData(submissions);
  return (
    <table id="Woodpage__submissions-table" cellPadding="3" cellSpacing="1">
      <tbody>
        <tr>{renderTableHeader(submissions)}</tr>
        {tableData}
      </tbody>
    </table>
  );
}

function renderTableHeader(submissions = []) {
  if (submissions.length) {
    let subObj = Object.keys(submissions[0]);
    const filteredArray = subObj.filter(obj => obj !== "user");
    let header = filteredArray;
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }
}

function renderTableData(submissions) {
  return submissions.map((sub, index) => {
    //make destructure iterative?
    const {
      id,
      date_created,
      tw_id,
      user_id,
      new_tw_name,
      density,
      e_long,
      e_cross,
      velocity_sound_long,
      radiation_ratio,
      sample_length,
      sample_width,
      sample_thickness,
      sample_weight_grams,
      peak_hz_long_grain,
      peak_hz_cross_grain,
      comments
    } = sub; //destructuring
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{date_created}</td>
        <td>{tw_id}</td>
        
        <td>{user_id}</td>
        <td>{density}</td>
        <td>{e_long}</td>
        <td>{e_cross}</td>
        <td>{velocity_sound_long}</td>
        <td>{radiation_ratio}</td>
        <td>{sample_length}</td>
        <td>{sample_width}</td>
        <td>{sample_thickness}</td>
        <td>{sample_weight_grams}</td>
        <td>{peak_hz_long_grain}</td>
        <td>{peak_hz_cross_grain}</td>
        <td>{comments || "none"}</td>
      </tr>
    );
  });
}
