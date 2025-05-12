import React from "react";

const CourseListRow = ({
  isHeader = false,
  textFirstCell = "",
  textSecondCell = null,
}) => {
  const headerRowStyle = { backgroundColor: "#deb5b545" };
  const defaultRowStyle = { backgroundColor: "#f5f5f5ab" };
  const rowStyle = isHeader ? headerRowStyle : defaultRowStyle;

  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr style={rowStyle}>
          <th colSpan="2">{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr style={rowStyle}>
        <th>{textFirstCell}</th>
        <th>{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr style={rowStyle}>
      <td>{textFirstCell}</td>
      <td>{textSecondCell}</td>
    </tr>
  );
};

export default CourseListRow;
