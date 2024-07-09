import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import StudentListing from './StudentListing';
import { BrowserRouter as Router } from 'react-router-dom';
const mockStore = configureStore([]);
describe('StudentListing', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      students: {
        list: [
          { id: 1, name: 'John Doe', gpa: 3.5 },
          { id: 2, name: 'Jane Smith', gpa: 3.8 },
        ],
        status: 'succeeded',
        error: null,
      },
    });
  });
  test('renders student list', () => {
    render(
      <Provider store={store}>
        <Router>
          <StudentListing />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Student Details')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
});