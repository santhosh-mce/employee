import Employee from '../models/Employee.js';
import AuditTrail from '../models/AuditTrail.js';

// Create a new employee
export const createEmployee = async (req, res) => {
  try {
    const { name, address, age, department, status } = req.body;
    if (!name || !address || !age || !department || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const employee = new Employee(req.body);
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    console.error('Create employee error:', err);
    res.status(400).json({ error: err.message });
  }
};

// Update an existing employee
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    if (!req.userId) {
      return res.status(401).json({ message: 'User authentication required' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, newData, { new: true });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Delete an existing employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

// Get a single employee
export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all audit trails
export const getAuditTrails = async (req, res) => {
  try {
    const auditTrails = await AuditTrail.find()
      .populate('userId', 'name')
      .populate('employeeId', 'name');

    res.status(200).json(auditTrails);
  } catch (error) {
    console.error('Error fetching audit trails:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
