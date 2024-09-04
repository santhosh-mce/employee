// src/components/Dashboard.js
import React from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';

// Register the components
ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const employees = useSelector((state) => state.employees.employees);

  // Pie Chart Data: Employees per Department
  const departmentCounts = employees.reduce((acc, employee) => {
    const department = employee.department;
    if (!acc[department]) {
      acc[department] = 0;
    }
    acc[department]++;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        label: 'Employees per Department',
        data: Object.values(departmentCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart Data: Employees per Department
  const barChartData = {
    labels: Object.keys(departmentCounts),
    datasets: [
      {
        label: 'Employees per Department',
        data: Object.values(departmentCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Line Chart Data: Employee Hiring Trends
  const dateCounts = employees.reduce((acc, employee) => {
    const hireDate = new Date(employee.hireDate).toLocaleDateString();
    if (!acc[hireDate]) {
      acc[hireDate] = 0;
    }
    acc[hireDate]++;
    return acc;
  }, {});

  const lineChartData = {
    labels: Object.keys(dateCounts),
    datasets: [
      {
        label: 'Employee Hiring Trends',
        data: Object.values(dateCounts),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Employee Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Employees per Department (Pie Chart)</h3>
          <div className="flex justify-center">
            <Pie data={pieChartData} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Employees per Department (Bar Chart)</h3>
          <div className="flex justify-center">
            <Bar data={barChartData} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Employee Hiring Trends (Line Chart)</h3>
          <div className="flex justify-center">
            <Line data={lineChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
