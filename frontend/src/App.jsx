import './App.css'
import { useState , useEffect } from 'react'

import Login from '../src/feautures/auth/Login.jsx'
import Dashboard from './feautures/dashboard/Dashboard.jsx'

function App() {

  const [ isLoggedIn , setIsLoggedIn ] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if(token) {
      setIsLoggedIn(true);
    }
    
  }, [])
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <>
        {
          isLoggedIn ? (
            <Dashboard onLogout = {handleLogout} />
          ) : (
            <Login onLoginSuccess = { () => setIsLoggedIn(true) } />
          )
        }
    </>
  )
}

export default App
