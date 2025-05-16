import React from "react";
import { StyleSheet, css } from 'aphrodite';

export default function CourseListRow({ isHeader=false, textFirstCell="", textSecondCell=null }) {
	const rowStyle = css(isHeader ? styles.headerRow : styles.dataRow);
	const cellStyle = css(styles.cell);
return (
	<tr className={rowStyle}>
		{isHeader ? (
			textSecondCell === null ? (
				<th className={cellStyle} colSpan="2">{textFirstCell}</th>
			) : (
				<>
					<th className={cellStyle} style={{ width: '70%'}}>{textFirstCell}</th>
					<th className={cellStyle}>{textSecondCell}</th>
				</>
			)
		) : (
			<>
				<td className={cellStyle}>{textFirstCell}</td>
				<td className={cellStyle}>{textSecondCell}</td>
			</>
		)}
	</tr>
	);
}

const styles = StyleSheet.create({
	headerRow: {
		backgroundColor: '#deb5b545',
	},
	dataRow: {
		backgroundColor: '#f5f5f5ab',
	},
	headecell: {
		backgroundColor: '#deb5b545',
		border: '1px solid black',
		borderCollapse: 'collapse'
	},
	cell: {
		border: '1px solid black',
		borderCollapse: 'collapse'
	},
})
