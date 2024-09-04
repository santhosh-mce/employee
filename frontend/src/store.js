import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './features/employeeSlice';
import authReducer from './features/authSlice';

const store = configureStore({
  reducer: {
    employees: employeeReducer,
    auth: authReducer,
  },
});

export default store;
