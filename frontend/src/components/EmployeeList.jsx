import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../features/employeeSlice';
import EmployeeModal from './EmployeeModal';
import { toast } from 'react-toastify';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const employeeStatus = useSelector((state) => state.employees.status);
  const error = useSelector((state) => state.employees.error);
  const token = localStorage.getItem('token');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [viewMode, setViewMode] = useState('');

  useEffect(() => {
    if (employeeStatus === 'idle' && token) {
      dispatch(fetchEmployees(token));
    }
  }, [employeeStatus, dispatch, token]);

  const handleViewClick = (employee) => {
    setSelectedEmployee(employee);
    setModalMode('view');
    setIsModalOpen(true);
    setViewMode('view');
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setModalMode('edit');
    setIsModalOpen(true);
    setViewMode('edit');
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await dispatch(deleteEmployee({ id, token })).unwrap();
        toast.success('Employee deleted successfully');
      } catch (error) {
        toast.error('Failed to delete employee: ' + (error.message || 'Internal Server Error'));
      }
    }
  };

  // Function to filter employees based on the search term and field
  const filterEmployees = (employees, searchTerm) => {
    return employees.filter((employee) => {
      const term = searchTerm.toLowerCase();
      return (
        employee.name.toLowerCase().includes(term) ||
        employee.address.toLowerCase().includes(term) ||
        employee.age.toString().includes(term) ||
        employee.department.toLowerCase().includes(term) ||
        employee.status.toLowerCase().includes(term)
      );
    });
  };

  const filteredEmployees = filterEmployees(employees, searchTerm);

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Employee List</h2>
      <input
        type="text"
        placeholder="Search by name, address, age, department, or status"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {employeeStatus === 'loading' && <p>Loading...</p>}
      {employeeStatus === 'failed' && <p className="text-red-500">Error: {error}</p>}
      {employeeStatus === 'succeeded' && (
        <div className="overflow-x-auto">
          {/* Table for desktop and tablet views */}
          <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200 hidden md:table">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Address</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Age</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Department</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={employee._id}>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">{employee.name}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">{employee.address}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">{employee.age}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">{employee.department}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">{employee.status}</td>
                  <td className="px-4 py-2 border-b text-sm text-gray-900">
                    <div className="flex flex-wrap space-x-2">
                      <button
                        onClick={() => handleViewClick(employee)}
                        className="text-blue-500 underline"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEditClick(employee)}
                        className="text-yellow-500 underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(employee._id)}
                        className="text-red-500 underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Card view for mobile */}
          <div className="md:hidden grid gap-4">
            {filteredEmployees.map((employee) => (
              <div key={employee._id} className="p-4 border rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-semibold">{employee.name}</h3>
                <p><strong>Address:</strong> {employee.address}</p>
                <p><strong>Age:</strong> {employee.age}</p>
                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Status:</strong> {employee.status}</p>
                <div className="flex mt-2 space-x-2">
                  <button
                    onClick={() => handleViewClick(employee)}
                    className="text-blue-500 underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditClick(employee)}
                    className="text-yellow-500 underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(employee._id)}
                    className="text-red-500 underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {isModalOpen && selectedEmployee && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => {
            setIsModalOpen(false);
            setViewMode('');
          }}
          mode={modalMode}
          onUpdate={() => dispatch(fetchEmployees(token))}
        />
      )}
    </div>
  );
};

export default EmployeeList;
