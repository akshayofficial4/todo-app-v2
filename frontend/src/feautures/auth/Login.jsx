import { useState } from "react";

function Login({onLoginSuccess, onShowRegister}) {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading , setLoading ] = useState(false);
    const [ error , setError ] = useState("");

    const handleLogin = async () => {

        if(!email || !password) {
            setError("email and password is required");
            return;
        }

       
        
        try {

            setLoading(true);
            setError("");


            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,{
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if(!res.ok) {
                
                throw new Error(data.message || "login failed");
            }
           
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);
            

            onLoginSuccess(data.user.role);
            

        }catch(error) {
            setError(error.message)
        } finally {
            setLoading(false);
            setEmail("");
            setPassword("");
        }
    };

    return (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">
          Welcome back 👋
        </h1>
        <p className="text-gray-400 text-sm">
          Login to manage your tasks
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>

      <p className="text-center text-sm text-gray-400">
        Don't have an account? {" "}
        <button onClick={onShowRegister} className="text-green-400 hover:underline hover:scale-300 transition">
          Register
        </button>
      </p>

      {/* Footer */}
      <p className="text-center text-xs text-gray-500">
        Secure login • MERN Todo App
      </p>
    </div>
  </div>
);

}

export default Login;