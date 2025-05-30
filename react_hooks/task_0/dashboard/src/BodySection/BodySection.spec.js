// src/BodySection/BodySection.spec.js

import React from "react";
import { shallow } from "enzyme";
import BodySection from "./BodySection";

describe("<BodySection />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    );
  });

  it("renders one h2 element that includes the text 'test title'", () => {
    expect(wrapper.contains(<h2>test title</h2>)).toBe(true);
  });

  it("renders children properly", () => {
    expect(wrapper.contains(<p>test children node</p>)).toBe(true);
  });
});
