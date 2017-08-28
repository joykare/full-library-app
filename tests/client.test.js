import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import LibraryApp from "../client/components/libraryApp.js";

describe("Library Component", () => {
  it("snapshot test", () => {
    const wrapper = shallow(<LibraryApp />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  })
})