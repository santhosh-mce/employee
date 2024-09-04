import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AuditTrail = () => {
  const [auditTrails, setAuditTrails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuditTrails = async () => {
      try {
        const response = await axios.get('/api/auditTrails', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAuditTrails(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditTrails();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Audit Trail</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border-b py-2 px-4 text-left">Action</th>
            <th className="border-b py-2 px-4 text-left">Employee ID</th>
            <th className="border-b py-2 px-4 text-left">Previous Data</th>
            <th className="border-b py-2 px-4 text-left">New Data</th>
            <th className="border-b py-2 px-4 text-left">Timestamp</th>
            <th className="border-b py-2 px-4 text-left">User ID</th>
          </tr>
        </thead>
        <tbody>
          {auditTrails.map((trail) => (
            <tr key={trail._id}>
              <td className="border-b py-2 px-4">{trail.action}</td>
              <td className="border-b py-2 px-4">{trail.employeeId}</td>
              <td className="border-b py-2 px-4">
                <pre>{JSON.stringify(trail.previousData, null, 2)}</pre>
              </td>
              <td className="border-b py-2 px-4">
                <pre>{JSON.stringify(trail.newData, null, 2)}</pre>
              </td>
              <td className="border-b py-2 px-4">{new Date(trail.timestamp).toLocaleString()}</td>
              <td className="border-b py-2 px-4">{trail.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditTrail;
