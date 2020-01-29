import React from "react";
import RegistrationForm from "./RegistrationForm";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("RegistrationForm component", () => {
  it("renders a RegistrationForm by default", () => {
    const wrapper = shallow(<RegistrationForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});