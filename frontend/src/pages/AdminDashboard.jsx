import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";


const AdminDashboard = ()=>{
    const [newEmployee, setNewEmployee] = useState({name: "", email: "", password: ""});



    const handleCreateEmloyee = async(e) =>{
        e.preventDefault();
        try{
            await api.post("/employees", newEmployee);
            alert("Employee created successfully");
            setNewEmployee({name: "", email: "", password: ""});
            fetchEmployees();
        }catch(error){
            alert(error.response.data.message || "Failed to create employee");
        }

    };


    return (
        <div>
            <h2>Admin Dashboard</h2>
            <h3>Create New Employee</h3>
            <form onSubmit={handleCreateEmloyee}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newEmployee.password}
                    onChange={(e) => setNewEmployee({...newEmployee, password: e.target.value})}
                />
                <button type="submit">Create Employee</button>
            </form>
        </div>
    )

}
export default AdminDashboard;