import React from "react";
import { Switch } from "../Utils/Utils";

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
        />
        <br></br>
        <Switch
          isOn={this.props.hardwoodOn}
          handleChange={this.props.handleHardwoodChange}
          switchId={"react-switch-hard"}
        />
      </div>
    );
  }
}
