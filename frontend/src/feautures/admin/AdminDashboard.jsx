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
                "http://localhost:5000/api/analytics",
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
        <div>
            
        </div>

      
    </div>
  )
}

export default AdminDashboard;
