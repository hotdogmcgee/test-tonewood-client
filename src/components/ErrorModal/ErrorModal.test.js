import React from "react";
import { ErrorModal } from "./ErrorModal";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("ErrorModal component", () => {
  const children = "there was an error";

  it("renders a ErrorModal by default", () => {
    const wrapper = shallow(<ErrorModal />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the ErrorModal given props", () => {
    const wrapper = shallow(<ErrorModal>{children}</ErrorModal>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
