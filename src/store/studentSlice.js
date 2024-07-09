// src/store/studentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const fetchStudentsAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Sameer Ahmed', gpa: 3.8 },
        { id: 2, name: 'Hamza Abrar', gpa: 3.5 },
        { id: 3, name: 'Amir Mehmood', gpa: 3.2 },
        { id: 4, name: 'Tafseer Hussain', gpa: 3.2 },
        { id: 5, name: 'Ebad Qureshi', gpa: 3.0 },
      ]);
    }, 500);
  });
};
const fetchStudentDetailsAPI = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        1: { id: 1, name: 'Sameer Ahmed', gpa: 3.8, age: 22, major: 'Software Engineering', email: 'sameer.ahemd@ssuet.edu.pk' },
        2: { id: 2, name: 'Hamza Abrar', gpa: 3.5, age: 22, major: 'Software Engineering', email: 'hamza.abrar@ssuet.edu.pk' },
        3: { id: 3, name: 'Amir Mehmood', gpa: 3.2, age: 22, major: 'Software Engineering', email: 'amir.mehmood@ssuet.edu.pk' },
        4: { id: 3, name: 'Tafseer Hussain', gpa: 3.2, age: 21, major: 'Software Engineering', email: 'tafseer.hussain@ssuet.edu.pk' },
        5: { id: 3, name: 'Ebad Qureshi', gpa: 3.0, age: 21, major: 'Software Engineering', email: 'ebad.qureshi@ssuet.edu.pk' },
      }[id]);
    }, 500);
  });
};
export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await fetchStudentsAPI();
  return response;
});
export const fetchStudentDetails = createAsyncThunk('students/fetchStudentDetails', async (id) => {
  const response = await fetchStudentDetailsAPI(id);
  return response;
});
export const addStudent = createAsyncThunk('students/addStudent', async (student) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newStudent = { ...student, id: Date.now().toString() };
      resolve(newStudent);
    }, 500);
  });
});
export const updateStudent = createAsyncThunk('students/updateStudent', async (student) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(student);
    }, 500);
  });
});
const studentSlice = createSlice({
  name: 'students',
  initialState: {
    list: [],
    selectedStudent: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
        state.selectedStudent = null; 
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchStudentDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudentDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedStudent = action.payload;
      })
      .addCase(fetchStudentDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.selectedStudent = action.payload; 
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.list.findIndex(student => student.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        state.selectedStudent = action.payload;
      });
  },
});
export default studentSlice.reducer;