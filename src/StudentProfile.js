import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchStudentDetails } from './store/studentSlice';
import styles from './StudentProfile.module.css';
const StudentProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedStudent, status, error } = useSelector((state) => state.students);
  useEffect(() => {
    dispatch(fetchStudentDetails(parseInt(id)));
  }, [dispatch, id]);
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  if (!selectedStudent) return <div>Student not found</div>;
  return (
    <div className={styles.profileCard}>
      <h2 className={styles.heading}>Student Profile</h2>
      <p className={styles.info}><span className={styles.label}>ID:</span> {selectedStudent.id}</p>
      <p className={styles.info}><span className={styles.label}>Name:</span> {selectedStudent.name}</p>
      <p className={styles.info}><span className={styles.label}>GPA:</span> {selectedStudent.gpa.toFixed(2)}</p>
      <p className={styles.info}><span className={styles.label}>Age:</span> {selectedStudent.age}</p>
      <p className={styles.info}><span className={styles.label}>Major:</span> {selectedStudent.major}</p>
      <p className={styles.info}><span className={styles.label}>Email:</span> {selectedStudent.email}</p>
      <Link to={`/edit-student/${selectedStudent.id}`} className={styles.editLink}>Edit Student</Link>
      <Link to="/" className={styles.backLink}>Back to Listing</Link>
    </div>
  );
};
export default StudentProfile;