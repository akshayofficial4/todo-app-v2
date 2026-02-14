import { useState } from "react";

function Login({onLoginSuccess}) {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading , setLoading ] = useState(false);

    const [ error , setError ] = useState("")

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        
        try {

            const res = await fetch('http://localhost:5000/api/auth/login',{
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
                alert("Login failed");
                throw new Error(data.message || "login failed");
            }
            console.log("Login success" , data);
            localStorage.setItem("token", data.token);
            onLoginSuccess();
            alert("login successful");
            

        }catch(error) {
            setError(error.message)
        } finally {
            setLoading(false);
            setEmail("");
            setPassword("");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-90 space-y-4">
            
                <h1 className="text-2xl font-bold text center">Login</h1>

                <input type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} className=" w-full p-2 rounded bg-gray-600 outline-none" />
                
                <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded bg-gray-600 outline-none" />

                <button onClick={handleLogin} disabled={loading} className="w-full bg-green-500 text-black rounded font-semibold p-2 disabled:opacity-50">
                    { loading ? "Logging In.." : "login" }
                </button>
            </div>

        </div>
    )
}

export default Login;