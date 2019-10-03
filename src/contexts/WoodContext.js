import React, { Component } from "react";

export const nullWood = {
  author: {},
  tags: []
};

const WoodContext = React.createContext({
  wood: nullWood,
  submissions: [],
  columnNamesToAverage: [],
  error: null,
  hasError: null,
  setError: () => {},
  clearError: () => {},
  setWood: () => {},
  clearWood: () => {},
  setSubmissions: () => {},
  setWoodNames: () => {}
});

export default WoodContext;

export class WoodProvider extends Component {
  state = {
    wood: nullWood,
    columnNamesToAverage: [
      "density",
      "e_long",
      "e_cross",
      "velocity_sound_long",
      "radiation_ratio"
    ],
    woodNames: [],
    error: null
  };

  setError = error => {
    this.setState({ error, hasError: true });
  };

  clearError = () => {
    this.setState({ error: null, hasError: null });
  };

  setWood = wood => {
    this.setState({ wood });
  };

  setSubmissions = submissions => {
    submissions.forEach(sub => {
      sub.user_id = sub.user.full_name;
      return "";
    });

    this.setState({ submissions });
  };

  setWoodNames = woods => {
    const names = woods.map(wood => {
      return wood.common_name;
    });
    this.setState({ woodNames: names });
  };

  clearWood = () => {
    this.setWood(nullWood);
  };

  render() {
    const value = {
      wood: this.state.wood,
      submissions: this.state.submissions,
      columnNamesToAverage: this.state.columnNamesToAverage,
      error: this.state.error,
      hasError: this.state.hasError,
      setError: this.setError,
      clearError: this.clearError,
      setWood: this.setWood,
      clearWood: this.clearWood,
      setSubmissions: this.setSubmissions,
      setWoodNames: this.setWoodNames
    };
    return (
      <WoodContext.Provider value={value}>
        {this.props.children}
      </WoodContext.Provider>
    );
  }
}
