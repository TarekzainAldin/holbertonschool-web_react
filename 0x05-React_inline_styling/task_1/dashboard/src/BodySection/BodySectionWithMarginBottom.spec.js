import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';
import { StyleSheetTestUtils, StyleSheet, css } from 'aphrodite';

StyleSheetTestUtils.suppressStyleInjection();

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('BodySectionWithMarginBottom Component', () => {
  it('renders correctly a BodySection component and passes props correctly', () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title='test title'>
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );

    // Check that BodySection component is rendered
    const bodySection = wrapper.find(BodySection);
    expect(bodySection).toHaveLength(1);

    // Check that BodySection component receives the correct title prop
    expect(bodySection.props().title).toEqual('test title');

    // Check that the BodySection component renders the children correctly
    expect(bodySection.dive().find('p').text()).toEqual('test children node');

    // Check that the div has the correct class
    const div = wrapper.find('div');
    const expectedClassName = css(StyleSheet.create({
      bodySectionWithMargin: {
        marginBottom: '40px',
      },
    }).bodySectionWithMargin);
    expect(div.hasClass(expectedClassName)).toBe(true);
  });
});
