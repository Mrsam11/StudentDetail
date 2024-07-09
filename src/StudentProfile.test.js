import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import StudentProfile from './StudentProfile';
const mockStore = configureStore([]);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
}));
describe('StudentProfile', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      students: {
        selectedStudent: {
          id: 1,
          name: 'John Doe',
          gpa: 3.5,
          age: 22,
          major: 'Computer Science',
          email: 'john@example.com',
        },
        status: 'succeeded',
        error: null,
      },
    });
  });
  test('renders student profile', () => {
    render(
      <Provider store={store}>
        <Router>
          <StudentProfile />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Student Profile')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('3.50')).toBeInTheDocument();
    expect(screen.getByText('22')).toBeInTheDocument();
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});