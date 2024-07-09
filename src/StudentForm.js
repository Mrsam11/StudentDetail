import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addStudent, updateStudent } from './store/studentSlice';
import { useNavigate } from 'react-router-dom';
import styles from './StudentForm.module.css';
const StudentSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  gpa: Yup.number().min(0, 'GPA must be at least 0').max(4, 'GPA must be at most 4').required('Required'),
  age: Yup.number().positive('Age must be positive').integer('Age must be an integer').required('Required'),
  major: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});
const StudentForm = ({ student }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = student
    ? { ...student }
    : { name: '', gpa: '', age: '', major: '', email: '' };
  const handleSubmit = (values, { setSubmitting }) => {
    if (student) {
      dispatch(updateStudent(values));
    } else {
      dispatch(addStudent(values));
    }
    setSubmitting(false);
    navigate('/');
  };
  return (
    <div className={styles.formContainer}>
      <h2>{student ? 'Update Student' : 'Add New Student'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={StudentSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.fieldGroup}>
              <label htmlFor="name">Name</label>
              <Field type="text" name="name" className={styles.field} />
              <ErrorMessage name="name" component="div" className={styles.error} />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="gpa">GPA</label>
              <Field type="number" name="gpa" step="0.01" className={styles.field} />
              <ErrorMessage name="gpa" component="div" className={styles.error} />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="age">Age</label>
              <Field type="number" name="age" className={styles.field} />
              <ErrorMessage name="age" component="div" className={styles.error} />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="major">Major</label>
              <Field type="text" name="major" className={styles.field} />
              <ErrorMessage name="major" component="div" className={styles.error} />
            </div>
            <div className={styles.fieldGroup}>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className={styles.field} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>
            <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
              {student ? 'Update' : 'Add'} Student
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default StudentForm;