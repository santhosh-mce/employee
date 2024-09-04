import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Remote Location', 'Contract Employee', 'Full-Time'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: { type: Date, default: Date.now },
});

const Employee = mongoose.model('Employee', EmployeeSchema);
export default Employee;
