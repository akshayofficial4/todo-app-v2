import React from 'react'
import { useState , useEffect } from 'react';


function AdminDashboard({onLogout}) {

    const [ stats, setStats ] = useState(null);
    const [ loading , setLoading ] = useState(false);

    useEffect(() => {

        fetchAnalytics();
      
    }, [])
    
    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/analytics`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            setStats(data);

        } catch(err){

            console.error("failed to fetch analytics");
            
        } finally{
            setLoading(false);
        }
    }

  return (
    <div className='min-h-screen bg-gray-900 text-white p-6'>
        <div className='flex justify-between items-center mb-8'>

            <h1 className='text-2xl font-bold text-blue-400'>Admin Dashboard</h1>

            <button onClick={onLogout} className='px-4 py-2 bg-red-500 text-black rounded hover:bg-red-400'>Logout</button>
        </div>

        {loading && <p>Loading analytics....</p>}

        {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded">
            <p className="text-gray-400">Total Users</p>
            <p className="text-2xl font-bold">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded">
            <p className="text-gray-400">Total Todos</p>
            <p className="text-2xl font-bold">
              {stats.totalTodos}
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded">
            <p className="text-gray-400">
              Completed Todos
            </p>
            <p className="text-2xl font-bold">
              {stats.completedTodos}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
