import React from 'react';
import Dashboard from './Dashboard';

const Home = () => {
  return (
    <div className="flex"> 
      <div className="flex-grow p-3">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome to the Employee Management System</h2>
      
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;
