import React from 'react';
import { css } from 'aphrodite';

function CourseListRow({ isHeader, textFirstCell, textSecondCell, style, id, isChecked = false, onChangeRow }) {
  const handleCheckboxChange = (e) => {
    if (onChangeRow) {
      onChangeRow(id, e.target.checked);
    }
  };

  if (isHeader) {
    if (textSecondCell === null || textSecondCell === undefined) {
      return (
        <tr>
          <th className={css(style)} colSpan="2">{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr>
        <th className={css(style)}>{textFirstCell}</th>
        <th className={css(style)}>{textSecondCell}</th>
      </tr>
    );
  }

  return (
    <tr>
      <td className={css(style)}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {textFirstCell}
      </td>
      <td className={css(style)}>{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;
