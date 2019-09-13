import React from 'react'
// import $ from 'jquery'

const WoodListContext = React.createContext({
    woodsList: [],
    savedList: [],
    error: null,
    setError: () => {},
    clearError: () => {},
    setWoodsList: () => {},
    setSavedList: () => {}
})

export default WoodListContext

export class WoodListProvider extends React.Component {
    state = {
        woodsList: [],
        savedList: [],
        error: null
    }


    setWoodsList = woodsList => {
        this.setState({ woodsList })
    }

    setSavedList = savedList => {
      this.setState({ savedList })

    }

    setError = error => {
        console.error(error)
        this.setState({ error })
        // $('#myModal').modal('show')
      }
    
      clearError = () => {
        this.setState({ error: null })
      }
      render() {
        const value = {
          woodsList: this.state.woodsList,
          savedList: this.state.savedList,
          error: this.state.error,
          setError: this.setError,
          clearError: this.clearError,
          setWoodsList: this.setWoodsList,
          setSavedList: this.setSavedList
        }
        return (
          <WoodListContext.Provider value={value}>
            {this.props.children}
          </WoodListContext.Provider>
        )
      }
}