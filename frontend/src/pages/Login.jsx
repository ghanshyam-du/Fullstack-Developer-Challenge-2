import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export  const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();



    const handleLogin = async(e) =>{
        e.preventDefault();

        try{
            const loggedin = await api.post("/auth/login", { email, password });
            localStorage.setItem("token", loggedin.data.token);
            localStorage.setItem("name", loggedin.data.name);
            localStorage.setItem("role", loggedin.data.role);
            localStorage.setItem("id", loggedin.data.id);


            if(loggedin.data.role === "admin"){
                navigate("/admin");
            }
            else{
                navigate("/employee");
            }
        }catch(err){
            console.error(err);
            alert("Login failed. Please check your credentials and try again.");
        }
    }

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;