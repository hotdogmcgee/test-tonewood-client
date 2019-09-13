import React from "react";
import { Input } from "../Utils/Utils";
import './SearchBar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class SearchBar extends React.Component {

static defaultProps = {
    onSearchChange: () => {}
}

handleInput = e => {
    e.preventDefault()
    const searchValue = e.target.value
    this.props.onSearchChange(searchValue)
}
  render() {
    return (
      <form className="SearchForm" onChange={this.handleInput} autoComplete="off">
        
        {/* <label htmlFor="search-bar">Search</label> */}
        <Input placeholder="tonewood" name="search-bar" id='SearchForm__entry' autoComplete="off"></Input>
      </form>

    );
  }
}
