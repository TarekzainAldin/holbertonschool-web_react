import React from "react";
import PropTypes from "prop-types";
//import { StyleSheet, css } from "aphrodite";

function CourseListRow({
  isHeader = false,
  textFirstCell = "",
  textSecondCell = null,
}) {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr>
          <th
            colSpan="2"
            //className={css(styles.th)}
          >
            {textFirstCell}
          </th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th
          //className={css(styles.th)}
          >
            {textFirstCell}
          </th>
          <th
          //className={css(styles.th)}
          >
            {textSecondCell}
          </th>
        </tr>
      );
    }
  }

  return (
    <tr>
      <td
      //className={css(styles.td)}
      >
        {textFirstCell}
      </td>
      <td
      //className={css(styles.td)}
      >
        {textSecondCell}
      </td>
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

/*const styles = StyleSheet.create({
  th: {
    border: "1px solid #ddd",
    padding: "10px",
    fontWeight: "bold",
    textAlign: "center",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
});*/

export default CourseListRow;
