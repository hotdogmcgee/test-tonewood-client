import React from "react";
import { Input } from "../Utils/Utils";

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
      <form className="SearchForm" onChange={this.handleInput}>
        <label htmlFor="search-bar">Search</label>
        <Input placeholder="tonewood" name="search-bar" id='SearchForm__entry'></Input>
      </form>

    );
  }
}
