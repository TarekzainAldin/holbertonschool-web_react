import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, selectCourse, unSelectCourse } from '../../features/courses/coursesSlice';
import CourseListRow from './CourseListRow/CourseListRow';
import WithLogging from '../../components/HOC/WithLogging';

function CourseList() {
  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const onChangeRow = (id, checked) => {
    if (checked) dispatch(selectCourse(id));
    else dispatch(unSelectCourse(id));
  };

  return (
    <div>
      <table id="CourseList">
        <thead>
          {courses.length > 0 ? (
            <>
              <CourseListRow textFirstCell="Available courses" isHeader={true} />
              <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
            </>
          ) : (
            <CourseListRow isHeader={true} textFirstCell="No course available yet" />
          )}
        </thead>
        {courses.length > 0 && (
          <tbody>
            {courses.map(course => (
              <CourseListRow
                key={course.id}
                id={course.id}
                textFirstCell={course.name}
                textSecondCell={course.credit}
                isChecked={course.isSelected}
                onChangeRow={onChangeRow}
              />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default WithLogging(CourseList);
