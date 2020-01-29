import React from "react";
import WoodListItem from "./WoodListItem";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("WoodListItem component", () => {

    const wood = {
        id: 2,
        common_name: 'maple',
        genus: 'maple',
        species: 'wood',
        number_of_submissions: 4
    }
  it("renders a WoodListItem by default", () => {
    const wrapper = shallow(<WoodListItem />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders a WoodListItem given props', () => {
    const wrapper = shallow(<WoodListItem wood={wood}/>);
    expect(toJson(wrapper)).toMatchSnapshot()
  })
});