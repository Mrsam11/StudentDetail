import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStudents } from './store/studentSlice';
import styles from './StudentListing.module.css';
const StudentListing = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.students);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  return (
    <div>
      <h1 className={styles.heading}>Student Details</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>GPA</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.gpa.toFixed(2)}</td>
              <td>
                <Link to={`/student/${student.id}`} className={styles.link}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table><br />
          <Link to="/add-student" className={styles.addButton}>Add New Student</Link>
    </div>
  );
};
export default StudentListing;