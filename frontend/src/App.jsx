  import React, { useState, useEffect } from "react";
  import { Route, Routes, useLocation } from "react-router-dom";
  import RegisterForm from "./components/RegisterForm";
  import LoginForm from "./components/LoginForm";
  import AddEmployeeForm from "./components/AddEmployeeForm";
  import Home from "./components/Home";
  import EmployeeList from "./components/EmployeeList";
  import Sidebar from "./components/Sidebar";
  import PrivateRoute from "./components/PrivateRoute";
  import AuditTrail from "./components/AuditTrail";
  import { ToastContainer } from 'react-toastify'

  function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation(); // Use to get current path

    useEffect(() => {
      // Simulate checking authentication status
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }, [location]);

    return (
      <div className="App bg-gray-100 min-h-screen flex">
        <ToastContainer/>
        {isAuthenticated &&
              location.pathname !== "/login" &&
              location.pathname !== "/register" && (
                <Sidebar /> // Render the Sidebar component only if authenticated
              )}
        <div className="flex-grow flex flex-col">
          <header className="bg-white shadow-md py-4 fixed top-0 left-0 w-full z-40 ">
            <h1 className="lg:text-3xl font-bold text-blue-600 text-center">
              Employee Management
            </h1>
            
          </header>
          
          <main className="flex-grow p-6 mt-16">
            
            <Routes>
              <Route path="/" element={<PrivateRoute />}>
                <Route index element={<EmployeeList />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/addemployee" element={<AddEmployeeForm />} />
                <Route path="/audit" element={<AuditTrail />} />
              </Route>
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
            </Routes>
          </main>
        </div>
      </div>
    );
  }

  export default App;
