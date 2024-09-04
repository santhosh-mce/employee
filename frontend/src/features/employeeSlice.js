import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async (token) => {
  try {
    const response = await api.get('/api/employees', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async ({ newEmployee, token }) => {
  const response = await api.post('/api/employees', newEmployee, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await api.delete(`/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Something went wrong');
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, newData, token }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/employees/${id}`, newData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : 'Something went wrong');
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(employee => employee._id !== action.payload);
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(employee => employee._id === action.payload._id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default employeeSlice.reducer;
