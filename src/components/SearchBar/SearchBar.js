import React from "react";
import { Input } from "../Utils/Utils";
import "./SearchBar.css";

export default class SearchBar extends React.Component {
  static defaultProps = {
    onSearchChange: () => {}
  };

  handleInput = e => {
    e.preventDefault();
    const searchValue = e.target.value;
    this.props.onSearchChange(searchValue);
  };
  render() {
    return (
      <div
        className="SearchForm"
        onChange={this.handleInput}
        autoComplete="off"
      >
        <Input
          placeholder="tonewood"
          name="search-bar"
          id="SearchForm__entry"
          autoComplete="off"
        ></Input>
      </div>
    );
  }
}
