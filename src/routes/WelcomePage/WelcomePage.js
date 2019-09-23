import React, { useState } from "react";
import { Section, Button } from "../../components/Utils/Utils";
import { Link } from "react-router-dom";
import WoodListContext from "../../contexts/WoodListContext";
import WoodApiService from "../../services/wood-api-service";
import WoodListItem from "../../components/WoodListItem/WoodListItem";
import About from "../../components/About/About";
import SearchBar from "../../components/SearchBar/SearchBar";
import SwitchHardness from "../../components/SwitchHardness/SwitchHardness";
import { ErrorModal } from "../../components/ErrorModal/ErrorModal";
import "./WelcomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch } from "../../components/Utils/Utils";

export default class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSoftwood: true,
      toggleHardwood: true
    };
    this.updateSoftwoods = this.updateSoftwoods.bind(this);
    this.updateHardwoods = this.updateHardwoods.bind(this);
  }

  static contextType = WoodListContext;

  componentDidMount() {
    this.context.clearError();
    WoodApiService.getWoods().then(this.context.setWoodsList);
    WoodApiService.getWoods()
      .then(this.context.setSavedList)
      .catch(this.context.setError);
  }

  //limit the number shown?
  //make function to show more
  renderWoods() {
    const { woodsList = [] } = this.context;
    const newList = woodsList.filter(
      wood => wood.common_name.toLowerCase() !== "other"
    );
    newList.filter((wood, index) => index < 9);

    return newList.map(wood => <WoodListItem key={wood.id} wood={wood} />);
  }

  handleSearchChange = value => {
    let currentList = [];
    let newList = [];

    if (value !== "") {
      currentList = this.context.savedList;

      newList = currentList.filter(item => {
        const lc = item.common_name.toLowerCase();
        const filter = value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.context.savedList;
    }

    this.context.setWoodsList(newList);
  };

  softwoodsFunc() {
    let currentList = [];
    let newList = [];
    if (!this.state.toggleSoftwood) {
      currentList = this.context.savedList;

      newList = currentList.filter(item => {
        const lc = item.hardness.toLowerCase();
        const filter = "softwood";
        return lc !== filter
      });
    } else {
      newList = this.context.savedList;
    }

    this.context.setWoodsList(newList);
  }

  hardwoodsFunc() {
    let currentList = [];
    let newList = [];
    if (!this.state.toggleHardwood) {
      currentList = this.context.savedList;

      newList = currentList.filter(item => {
        const lc = item.hardness.toLowerCase();
        const filter = "hardwood";
        return lc !== filter
      });
    } else {
      newList = this.context.savedList;
    }

    this.context.setWoodsList(newList);
  }
  updateSoftwoods() {
    const { toggleSoftwood } = this.state;
    this.setState(
      {
        toggleSoftwood: !toggleSoftwood
      },
      this.softwoodsFunc
    );
  }

  updateHardwoods() {
    const { toggleHardwood } = this.state;
    this.setState(
      {
        toggleHardwood: !toggleHardwood
      },
      this.hardwoodsFunc
    );
  }

  render() {
    const { error } = this.context;

    return (
      <>
        <Section id="About">
          <About />
        </Section>

        <Section id="SearchBar__Section">
          <FontAwesomeIcon icon="tree" size="3x" />
          <SearchBar onSearchChange={this.handleSearchChange} />

          <SwitchHardness
            handleSoftwoodChange={this.updateSoftwoods}
            softwoodOn={this.state.toggleSoftwood}
            hardwoodOn={this.state.toggleHardwood}
            handleHardwoodChange={this.updateHardwoods}
          />
        </Section>
        <Section list className="WoodList">
          {error ? <h2>error</h2> : this.renderWoods()}
        </Section>
        <Section id="Submission-Link-Section">
          <Link to={"/new-submission"} className="Submission-Link">
            <Button>Submit your data!</Button>
          </Link>
        </Section>
      </>
    );
  }
}
