import React from "react";
import About from "./About.js";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("About component", () => {
  it("renders an About component by default", () => {
    const wrapper = shallow(<About />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  //consider adding testing for clicks
  it("opens a Modal on button click", () => {
    const wrapper = shallow(<About />);

    wrapper.find(".modal-button").simulate("click");
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
