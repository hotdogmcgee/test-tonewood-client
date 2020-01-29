import React from "react";
import SubmissionsSuccess from "./SubmissionSuccess";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("SubmissionsSuccess component", () => {
  it("renders a SubmissionsSuccess by default", () => {
    const wrapper = shallow(<SubmissionsSuccess />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});