import React from "react";
import LoginForm from "./LoginForm";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("LoginForm component", () => {
  it("renders a LoginForm by default", () => {
    const wrapper = shallow(<LoginForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});