import React from "react";
import SwitchHardness from "./SwitchHardness";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("SwitchHardness component", () => {
  it("renders a SwitchHardness by default", () => {
    const wrapper = shallow(<SwitchHardness />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

//implement testing for clicking a Switch
});
