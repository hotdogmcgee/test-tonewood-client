import React from "react";
import SubmissionForm from "./SubmissionForm";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("SubmissionForm component", () => {
  it("renders a SubmissionForm by default", () => {
    const wrapper = shallow(<SubmissionForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});