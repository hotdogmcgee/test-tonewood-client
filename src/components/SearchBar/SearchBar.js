import React from "react";
import { Input } from "../Utils/Utils";
import "./SearchBar.css";

// const Checkbox = props => (
//   <input type="checkbox" {...props} />
// )

export default class SearchBar extends React.Component {

  // state = { checked: false }
  static defaultProps = {
    onSearchChange: () => {}
  };

  handleInput = e => {
    e.preventDefault();
    const searchValue = e.target.value;
    this.props.onSearchChange(searchValue);
  };

  handleCheck = e => {
    e.preventDefault();
    const checkValue = e.target.value;
    this.props.onWoodTypeChecked(checkValue)
  }

  
  render() {
    return (
      <div
        className="SearchForm"
        onChange={this.handleInput}
        autoComplete="off"
      >
        <Input
          placeholder="search"
          name="search-bar"
          id="SearchForm__entry"
          autoComplete="off"
        ></Input>
      </div>

    );
  }
}
