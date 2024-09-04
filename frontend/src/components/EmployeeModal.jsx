import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../api/api";

const EmployeeModal = ({ employee, onClose, mode, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState(employee);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    setFormData(employee);
  }, [employee]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUpdateError("No token found. Please log in again.");
      return;
    }

    const id = employee._id;

    try {
      await api.put(`/api/employees/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Employee updated successfully");
      if (onUpdate) onUpdate(); // Call the refresh function if it's defined
      onClose();
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setUpdateError("Unauthorized. Please log in again.");
        toast.error("Unauthorized. Please log in again.");
      } else {
        setUpdateError(
          "Error updating employee: " +
            (error.response ? error.response.data.message : error.message)
        );
        toast.error(
          "Error updating employee: " +
            (error.response ? error.response.data.message : error.message)
        );
      }
    }
  };

  const openGoogleMaps = () => {
    if (employee && employee.address) {
      const encodedAddress = encodeURIComponent(employee.address);
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
      window.open(mapUrl, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-full max-w-2xl shadow-lg rounded-lg">
        <div className="flex mb-4 border-b pb-2">
          <button
            onClick={() => handleTabChange("details")}
            className={`mr-4 ${
              activeTab === "details"
                ? "font-bold border-b-2 border-blue-500"
                : ""
            }`}
          >
            Details
          </button>
          <button
            onClick={() => handleTabChange("location")}
            className={`mr-4 ${
              activeTab === "location"
                ? "font-bold border-b-2 border-blue-500"
                : ""
            }`}
          >
            Location
          </button>
          <button onClick={onClose} className="ml-auto text-red-500">
            Close
          </button>
        </div>

        {activeTab === "details" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{employee.name}</h2>
            <p className="text-gray-700 mb-2">
              <strong>ID:</strong> {employee._id}
            </p>
            {mode === "edit" && (
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-600"
                    htmlFor="address"
                  >
                    Address:
                  </label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-600"
                    htmlFor="age"
                  >
                    Age:
                  </label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-600"
                    htmlFor="department"
                  >
                    Department:
                  </label>
                  <input
                    id="department"
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-600"
                    htmlFor="status"
                  >
                    Status:
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="">Select Status</option>
                    <option value="Remote Location">Remote Location</option>
                    <option value="Contract Employee">Contract Employee</option>
                    <option value="Full-Time">Full-Time</option>
                  </select>
                </div>
                <button
                  onClick={handleUpdate}
                  className="text-green-500 underline mt-4"
                >
                  Update
                </button>
                {updateError && (
                  <p className="text-red-500 mt-2">{updateError}</p>
                )}
              </div>
            )}
            {mode === "view" && (
              <div>
                <p className="text-gray-700 mb-2">
                  <strong>Address:</strong> {employee.address}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Age:</strong> {employee.age}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Department:</strong> {employee.department}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Status:</strong> {employee.status}
                </p>
              </div>
            )}
          </div>
        )}
        {activeTab === "location" && (
          <div>
            <button
              onClick={openGoogleMaps}
              className="text-blue-500 underline"
            >
              View Address on Google Maps
            </button>
          </div>
        )}
        {/* Add ToastContainer for react-toastify */}
      </div>
    </div>
  );
};

export default EmployeeModal;
