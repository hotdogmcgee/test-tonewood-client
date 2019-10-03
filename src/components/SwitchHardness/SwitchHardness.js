import React from "react";
import { Switch } from "../Utils/Utils";
import "./SwitchHardness.css";

export default class SwitchHardness extends React.Component {
  static defaultProps = {
    softwoodOn: "",
    hardwoodOn: "",
    handleSoftwoodChange: () => {},
    handleHardwoodChange: () => {}
  };

  render() {
    return (
      <div className="hardness-switches">
        <Switch
          isOn={this.props.softwoodOn}
          handleChange={this.props.handleSoftwoodChange}
          switchId={"react-switch-soft"}
          type={"Softwood"}
        />
        <Switch
          isOn={this.props.hardwoodOn}
          handleChange={this.props.handleHardwoodChange}
          switchId={"react-switch-hard"}
          type={"Hardwood"}
        />
      </div>
    );
  }
}
