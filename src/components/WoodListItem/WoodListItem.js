import React from "react";
import { Link } from "react-router-dom";
import "./WoodListItem.css";

export default class WoodListItem extends React.Component {
  render() {
    const { wood } = this.props;
    return (
      <Link to={`/woods/${wood.id}`} className="WoodListItem">
        {/* <div className='WoodListItem__image' style={{backgroundImage: '../../WoodImages/ThujaPlicata.jpg'}} /> */}

        <div className="WoodListItem__details">
          <div className="WoodListItem__text">
            <h2 className="WoodListItem__heading">{wood.common_name}</h2>
            <p className="scientific-name">
              {wood.genus} {wood.species}
            </p>
            {/* <p className='WoodListItem__description'>{truncate(wood.description)}</p> */}
          </div>

          <div className="WoodListItem__submissions">
            <span id="WoodListItem_submission-count">
              {readableSubmissionCount(wood.number_of_submissions)}
            </span>
          </div>
        </div>
      </Link>
    );
  }
}

function readableSubmissionCount(number) {
  switch (number) {
    case 0:
      return "no submissions yet";

    case 1:
      return "1 submission";

    default:
      return `${number} submissions`;
  }
}

