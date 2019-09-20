import React, { Component } from 'react'

export const nullWood = {
  author: {},
  tags: [],
}

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
  setSubmissions: () => {}
})

export default WoodContext

export class WoodProvider extends Component {
  state = {
    wood: nullWood,
    columnNamesToAverage: [
      'density',
      'e_long',
      'e_cross',
      'velocity_sound_long',
      'radiation_ratio'
    ],
    error: null,
  };

  setError = error => {
    this.setState({ error, hasError: true })
  }

  clearError = () => {
    this.setState({ error: null, hasError: null })
  }

  setWood = wood => {
    this.setState({ wood })
  }

  setSubmissions = submissions => {
    this.setState({ submissions })
  }



  clearWood = () => {
    this.setWood(nullWood)
  }

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
      setSubmissions: this.setSubmissions
    }
    return (
      <WoodContext.Provider value={value}>
        {this.props.children}
      </WoodContext.Provider>
    )
  }
}
