import { StyleSheet, css } from 'aphrodite';
import { useSelector } from 'react-redux';
import CourseListRow from './CourseListRow/CourseListRow';
import WithLogging from '../../components/HOC/WithLogging';

const styles = StyleSheet.create({
  courses: {
     // style//}
  },
  table: {
   // style//}
  },
  thtd: {
    // style//}
  },
});

function CourseList() {
  // Adjust this selector if your courses are stored elsewhere in the Redux store.
  const courses = useSelector((state) => state.courses.list || []);

  return (
    <div className={css(styles.courses)}>
      <table id="CourseList" className={css(styles.table)}>
        <thead>
          <CourseListRow
            textFirstCell="Available courses"
            isHeader={true}
            style={styles.thtd}
          />
          <CourseListRow
            textFirstCell="Course name"
            textSecondCell="Credit"
            isHeader={true}
            style={styles.thtd}
          />
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseListRow
                key={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
                isHeader={false}
                style={styles.thtd}
              />
            ))
          ) : (
            <CourseListRow
              textFirstCell="No course available yet"
              isHeader={false}
              style={styles.thtd}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WithLogging(CourseList);
