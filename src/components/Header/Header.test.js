import React from "react";
import Header from "./Header";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("Header component", () => {
  it("renders a Header by default", () => {
    const wrapper = shallow(<Header />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
