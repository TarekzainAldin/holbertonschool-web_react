import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { useSelector } from 'react-redux';
import CourseListRow from './CourseListRow/CourseListRow';
import WithLogging from '../../components/HOC/WithLogging';

const styles = StyleSheet.create({
  courses: {
    margin: '130px auto',
    width: '80%',
  },
});

function CourseList() {
  // Select courses array from Redux store (adjust the path if needed)
  const courses = useSelector((state) => state.courses.list);

  return (
    <div className={css(styles.courses)}>
      {/* Render table headers */}
      <table>
        <thead>
          <CourseListRow textFirstCell="Available courses" isHeader={true} />
          <CourseListRow
            textFirstCell="Course name"
            textSecondCell="Credit"
            isHeader={true}
          />
        </thead>
        <tbody>
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <CourseListRow
                key={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
                isHeader={false}
              />
            ))
          ) : (
            <CourseListRow
              textFirstCell="No course available yet"
              isHeader={false}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WithLogging(CourseList);
