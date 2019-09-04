import React, { Component } from 'react'

export const nullWood = {
  author: {},
  tags: [],
}

const WoodContext = React.createContext({
  wood: nullWood,
  submissions: [],
  error: null,
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
    error: null,
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
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
      error: this.state.error,
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
