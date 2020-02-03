import React from "react";
import { Section, Button } from "../../components/Utils/Utils";
import { Link } from "react-router-dom";
import WoodListContext from "../../contexts/WoodListContext";
import WoodApiService from "../../services/wood-api-service";
import WoodListItem from "../../components/WoodListItem/WoodListItem";
import About from "../../components/About/About";
import SearchBar from "../../components/SearchBar/SearchBar";
import SwitchHardness from "../../components/SwitchHardness/SwitchHardness";
import "./WelcomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSoftwood: true,
      toggleHardwood: true,
      showMore: false,
      searchValue: ""
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

  renderWoods() {
    const { woodsList = [] } = this.context;
    const newList = woodsList.filter(
      wood => wood.common_name.toLowerCase() !== "other"
    );

    if (!this.state.showMore) {
      const filter = newList.filter((wood, index) => index < 9);

      return filter.map(wood => <WoodListItem key={wood.id} wood={wood} />);
    }

    return newList.map(wood => <WoodListItem key={wood.id} wood={wood} />);
  }

  renderShowMoreButton() {
    if (this.context.woodsList.length > 10) {
      return (
        <button
          className="fade-in"
          onClick={() => this.handleListLengthToggle()}
        >
          Show More
        </button>
      );
    }
    return "";
  }

  renderShowLessButton() {
    if (this.context.woodsList.length > 10) {
      return (
        <button
          className="fade-in"
          onClick={() => this.handleListLengthToggle()}
        >
          Show Less
        </button>
      );
    }
    return "";
  }

  handleListLengthToggle() {
    const current = this.state.showMore;
    this.setState({
      showMore: !current
    });
  }

  //these searching functions are a bit verbose, can try to clean them up
  handleSearchHardness(list) {
    const { toggleSoftwood, toggleHardwood } = this.state;

    let newList;

    if (!toggleHardwood && !toggleSoftwood) {
      newList = [];
    } else if (!toggleSoftwood) {
      newList = list.filter(item => {
        const lc = item.hardness.toLowerCase();
        const filter = "softwood";
        return lc !== filter;
      });
    } else if (!toggleHardwood) {
      newList = list.filter(item => {
        const lc = item.hardness.toLowerCase();
        const filter = "hardwood";
        return lc !== filter;
      });
    } else {
      newList = list;
    }

    return newList;
  }
  handleSearchChange = value => {
    let currentList = [];
    let newList = [];

    this.setState({
      searchValue: value
    });

    const { toggleHardwood, toggleSoftwood } = this.state;

    if (!toggleHardwood && !toggleSoftwood) {
      newList = [];
    } else if (value !== "") {
      currentList = this.context.savedList;

      newList = currentList.filter(item => {
        const lc = item.common_name.toLowerCase();
        const filter = value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.context.savedList;
    }

    const hardnessList = this.handleSearchHardness(newList);
    this.context.setWoodsList(hardnessList);
  };

  hardnessFunc() {
    let currentList = [];
    let newList = [];
    const { toggleHardwood, toggleSoftwood, searchValue } = this.state;

    if (!toggleHardwood && !toggleSoftwood) {
      newList = [];
    } else if (!toggleSoftwood) {
      currentList = this.context.savedList;

      newList = currentList.filter(item => {
        const lc = item.hardness.toLowerCase();
        const filter = "softwood";
        return lc !== filter;
      });
    } else if (!toggleHardwood) {
      currentList = this.context.savedList;

      newList = currentList.filter(item => {
        const lc = item.hardness.toLowerCase();
        const filter = "hardwood";
        return lc !== filter;
      });
    } else {
      newList = this.context.savedList;
    }

    const searchedList = newList.filter(item => {
      const filter = searchValue.toLowerCase();
      const lc = item.common_name.toLowerCase();
      return lc.includes(filter);
    });
    this.context.setWoodsList(searchedList);
  }

  updateSoftwoods() {
    const { toggleSoftwood } = this.state;
    this.setState(
      {
        toggleSoftwood: !toggleSoftwood
      },
      this.hardnessFunc
    );
  }

  updateHardwoods() {
    const { toggleHardwood } = this.state;
    this.setState(
      {
        toggleHardwood: !toggleHardwood
      },
      this.hardnessFunc
    );
  }

  render() {
    const { error } = this.context;

    return (
      <>
        <Section id="About">
          <About hasLogin={this.props.hasLogin}/>
        </Section>

        <Section id="SearchBar__Section">
          <FontAwesomeIcon icon="tree" size="3x" />
          <SearchBar onSearchChange={this.handleSearchChange} />
        </Section>
        <Section id="SwitchHardness__Section">
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
        <Section id="ToggleLength__Section">
          {!this.state.showMore
            ? this.renderShowMoreButton()
            : this.renderShowLessButton()}
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
