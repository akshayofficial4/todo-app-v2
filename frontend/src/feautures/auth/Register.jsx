import React from 'react'
import { useState } from 'react'

function Register({onRegisterSuccess}) {
  const [ username , setUsername ] = useState("");
  const [email , setEmail ] = useState("");
  const [ password , setpassword ] = useState("");
  const [ error , setError ] = useState("");
  const [ loading , setLoading ] = useState("");

  const handleRegister = async () => {

    if(!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {

      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/api/auth/register",{
        method: "POST",
        headers : {
          "Content-type" : "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })

      const data = await res.json();
      if(!res.ok) {
        throw new Error(data.message|| "Registration failed");
      }
      onRegisterSuccess();
      
    } catch (error) {
      setError(error.message);

    }finally{
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-950 flex items-center justify-center px-4'>

      <div className='w-full max-w-md bg-gray-900  rounded-xl shadow-lg p-8 space-y-6'>

          <div className='text-center space-y-2'>
              <h1 className='text-3xl font-bold text-white'>
                Create Account
              </h1>

              <p className='text-gray-400 text-sm'>
                sign up to start managing your task
              </p>

          </div>

          {
            error && (
              <div className='bg-red-500/10 text-red-400 text-sm p-3 rounded'>
                {error}
              </div>
            )
          }

          <div className='space-y-4'>

            <input 
              type='text'
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500 '
            />

            <input 
              type='email'
              placeholder='Enter the email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500'
            />

            <input 
              type='password'
              value={password}
              placeholder='enter password'
              onChange={(e) => setpassword(e.target.value)}
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500'
            />

            <button onClick={handleRegister} disabled={loading} className='w-full py-3 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition disabled:opacity-50' >
              { loading ? "Creating Account" : "Register"}
            </button>

          </div>

      </div>
      
    </div>
  )
}

export default Register
