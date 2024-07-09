import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}><h1>Student Management</h1></Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;