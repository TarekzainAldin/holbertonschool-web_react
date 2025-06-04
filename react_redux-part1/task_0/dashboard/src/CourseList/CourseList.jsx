import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';
import { StyleSheet, css } from 'aphrodite';

function CourseList({ courses = [] }) {
  const isEmpty = courses.length === 0;

  return (
    <table className={css(styles.courseList)}>
      {!isEmpty && (
        <thead>
          <CourseListRow isHeader={true} textFirstCell="Available courses" />
          <CourseListRow
            isHeader={true}
            textFirstCell="Course name"
            textSecondCell="Credit"
          />
        </thead>
      )}
      <tbody>
        {isEmpty ? (
          <CourseListRow
            isHeader={true}
            textFirstCell="No course available yet"
          />
        ) : (
          courses.map((course) => (
            <CourseListRow
              key={course.id}
              isHeader={false}
              textFirstCell={course.name}
              textSecondCell={course.credit}
            />
          ))
        )}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      credit: PropTypes.number,
    })
  ),
};

const styles = StyleSheet.create({
  courseList: {
    border: '1px solid #ddd',
    borderCollapse: 'collapse',
    width: '90%',
    margin: '40px auto',
  },
});

export default CourseList;
