import React from "react";
import PropTypes from "prop-types";
import BodySection from "./BodySection";
//import { StyleSheet, css } from "aphrodite";

class BodySectionWithMarginBottom extends React.Component {
  render() {
    return (
      <div
      //className={css(styles.bodySectionWithMargin)}
      >
        <BodySection title={this.props.title}>
          {this.props.children}
        </BodySection>
      </div>
    );
  }
}

/*const styles = StyleSheet.create({
  bodySectionWithMargin: {
    marginBottom: "40px",
  },
});

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};*/

export default BodySectionWithMarginBottom;
