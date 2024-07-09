import React from 'react';
import StudentListing from './StudentListing';
import StudentProfile from './StudentProfile';
const Shell = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <StudentListing />
      </div>
      <div style={{ flex: 1 }}>
        <StudentProfile />
      </div>
    </div>
  );
};
export default Shell;