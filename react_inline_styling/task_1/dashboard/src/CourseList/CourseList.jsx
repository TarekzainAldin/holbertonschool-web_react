import React from "react";
import CourseListRow from "./CourseListRow";
import WithLogging from "../HOC/WithLogging";
import { StyleSheet, css } from 'aphrodite';

class CourseList extends React.Component {
	render() {
		const { courses=[] } = this.props;
		return (
			<table className={css(styles.couseList)}>
				{courses.length > 0 ? (
					<>
						<thead>
							<CourseListRow isHeader={true} textFirstCell="Available courses" />
							<CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
						</thead>
						<tbody>
							{courses.map((course) => (
								<CourseListRow
									key={course.id}
									textFirstCell={course.name}
									textSecondCell={course.credit}
								/>
							))}
						</tbody>
					</>
					) : (
						<tbody>
							<CourseListRow isHeader={true} textFirstCell="No course available yet" />
						</tbody>
						)}
			</table>
		);
	}
}

const styles = StyleSheet.create({
	couseList: {
		width: '90vw',
		margin: 'auto',
		border: '1px solid black',
		borderCollapse: 'collapse'
	},
})

const CourseListWithLogging = WithLogging(CourseList);
export default CourseListWithLogging;
