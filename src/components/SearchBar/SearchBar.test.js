import React from "react";
import SearchBar from "./SearchBar";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("SearchBar component", () => {
  it("renders a SearchBar by default", () => {
    const wrapper = shallow(<SearchBar />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});