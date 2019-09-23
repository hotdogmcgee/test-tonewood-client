import React from "react";
import { Switch } from "../Utils/Utils";

export default class SwitchHardness extends React.Component {
  static defaultProps = {
      softwoodOn: "",
    hardwoodOn: "",
    handleSoftwoodChange: () => {},
    handleHardwoodChange: () => {}
  };

//   handleSubmit(e) {
//     e.preventDefault();
//   }
  render() {
    return (
      <div className="hardness-switches">
        {/* <Switch 
                    isOn={this.props.softwoodOn}
                    handleChange={this.props.handleSoftwoodChange}
                />
                <br></br>
                <Switch 
                    isOn={this.props.hardwoodOn}
                    handleChange={this.props.handleHardwoodChange}
                /> */}
          <input
            checked={this.props.softwoodOn}
            onChange={() => this.props.handleSoftwoodChange()}
            className="react-switch-checkbox"
            id={`react-switch-new`}
            type="checkbox"
          />
          <label className="react-switch-label" htmlFor={`react-switch-new`}>
            <span className={`react-switch-button`} />
          </label>
          {/* <input
            checked={this.props.hardwoodOn}
            onChange={() => this.props.handleHardwoodChange()}
            className="react-switch-checkbox hardwood-check"
            id={`react-switch-new`}
            type="checkbox"
          />
          <label className="react-switch-label" htmlFor={`react-switch-new`}>
            <span className={`react-switch-button`} />
          </label> */}
      </div>
    );
  }
}
