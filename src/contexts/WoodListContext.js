import React from 'react'

const WoodListContext = React.createContext({
    woodList: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setWoodsList: () => {}
})

export default WoodListContext

export class WoodListProvider extends React.Component {
    state = {
        woodList: [],
        error: null
    }

    setWoodsList = woodsList => {
        this.setState({ woodsList })
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
      }
    
      clearError = () => {
        this.setState({ error: null })
      }
      render() {
        const value = {
          woodsList: this.state.woodsList,
          error: this.state.error,
          setError: this.setError,
          clearError: this.clearError,
          setWoodsList: this.setWoodsList,
        }
        return (
          <WoodListContext.Provider value={value}>
            {this.props.children}
          </WoodListContext.Provider>
        )
      }
}