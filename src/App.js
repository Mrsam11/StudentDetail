import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import Navigation from './Navigation';
import StudentListing from './StudentListing';
import StudentProfile from './StudentProfile';
import StudentForm from './StudentForm';
import './index.css';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navigation />
          <div className="container">
            <Routes>
              <Route path="/" element={<StudentListing />} />
              <Route path="/student/:id" element={<StudentProfile />} />
              <Route path="/add-student" element={<StudentForm />} />
              <Route path="/edit-student/:id" element={<StudentProfile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}
export default App;