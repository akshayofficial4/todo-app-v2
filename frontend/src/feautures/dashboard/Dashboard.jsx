import React from 'react'

const Dashboard = ( { onLogout } ) => {
  return (
    <div className='min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4'>

        <h1 className='text-2xl font-bold'>
            you are logged in
        </h1>

        <button onClick={onLogout} className='px-4 py-2 bg-red-500 text-black rounded' >
            Logout..
        </button>
      
    </div>
  )
}

export default Dashboard
