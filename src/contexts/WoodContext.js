import React, { Component } from 'react'

export const nullWood = {
  author: {},
  tags: [],
}

const WoodContext = React.createContext({
  wood: nullWood,
  submissions: [],
  columnNames: [],
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
    columnNames: [
      'density',
      'e_long',
      'e_cross',
      'velocity_sound_long',
      'radiation_ratio',
      'sample_length',
      'sample_width',
      'sample_thickness',
      'sample_weight',
      'peak_hz_long_grain',
      'peak_hz_cross_grain',
    ],
    error: null,
  };

  setError = error => {
    console.error(error)
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
      columnNames: this.state.columnNames,
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
