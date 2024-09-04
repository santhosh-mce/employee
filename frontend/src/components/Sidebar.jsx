import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UsersIcon, ChartBarIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    window.location.href = '/login'; // Redirect to login page
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false); // Close the sidebar when a link is clicked
  };

  return (
    <div>
      <button 
        className="lg:hidden p-4 text-white bg-gray-800 fixed top-0 left-0 z-50"
        onClick={toggleSidebar}
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <nav className={`lg:flex lg:items-start lg:justify-between lg:flex-col lg:w-64 lg:min-h-full bg-gray-800 text-white fixed inset-0 lg:relative transform lg:transform-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-4 text-2xl font-bold text-center mt-16">Employee Management</div>
        <ul className="flex-grow">
          <li>
            <Link to="/" className="flex items-center p-4 hover:bg-gray-700" onClick={handleLinkClick}>
              <UsersIcon className="h-6 w-6 mr-3" />
              Employees
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="flex items-center p-4 hover:bg-gray-700" onClick={handleLinkClick}>
              <ChartBarIcon className="h-6 w-6 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/addemployee" className="flex items-center p-4 hover:bg-gray-700" onClick={handleLinkClick}>
              <UsersIcon className="h-6 w-6 mr-3" />
              Add Employees
            </Link>
          </li>
          <li>
            <Link to="/logout" onClick={() => { handleLogout(); handleLinkClick(); }} className="flex items-center p-4 hover:bg-gray-700">
              <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3" />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
