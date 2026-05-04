import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";


const AdminDashboard = () => {
    const navigate = useNavigate();
  
    const [employees, setEmployees]   = useState([]);
    const [newEmp, setNewEmp]         = useState({ name: "", email: "", password: "" });
    const [reviews, setReviews]       = useState([]);
    const [newReview, setNewReview]   = useState({ title: "", description: "" });
    const [assignment, setAssignment] = useState({ review: "", reviewer: "", reviewee: "" });
    const [message, setMessage]       = useState("");

    useEffect(() => {
        fetchEmployees();
        fetchReviews();
    }, []);

    const fetchEmployees = async () => {
        const res = await api.get("/employees");
        setEmployees(res.data);
    };

    const fetchReviews = async () => {
        const res = await api.get("/reviews");
        setReviews(res.data);
    };

    const handleCreateEmployee = async (e) => {
        e.preventDefault();
        try {
            await api.post("/employees", newEmp);
            setMessage("Employee created");
            setNewEmp({ name: "", email: "", password: "" });
            fetchEmployees();
        } catch (err) {
            setMessage(err.response?.data?.message || "Error");
        }
    };

    const handleDeleteEmployee = async (id) => {
        await api.delete(`/employees/${id}`);
        setMessage("Employee deleted");
        fetchEmployees();
    };

    const handleCreateReview = async (e) => {
        e.preventDefault();
        try {
            const reviewData = {
            ...newReview,
            createdBy: localStorage.getItem("id") 
        };
            await api.post("/reviews", reviewData);
            setMessage("Review created");
            setNewReview({ title: "", description: "", createdBy: "" });
            fetchReviews();
        } catch (err) {
            setMessage(err.response?.data?.message || "Error");
        }
    };

    const handleAssign = async (e) => {
        e.preventDefault();
        try {
            await api.post("/assignments", assignment);
            setMessage("Assignment created");
            setAssignment({ review: "", reviewer: "", reviewee: "" });
        } catch (err) {
            setMessage(err.response?.data?.message || "Error");
        }
    };

    const handleViewAllAssignments = () => {
        
    }

     const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

     return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Admin Dashboard</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>

            {message && <p style={{ color: "green" }}>{message}</p>}

            {/* ── EMPLOYEES ── */}
            <hr />
            <h3>Employees</h3>

            <form onSubmit={handleCreateEmployee} style={{ marginBottom: "10px" }}>
                <input placeholder="Name"     value={newEmp.name}
                    onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })} required />
                <input placeholder="Email"    value={newEmp.email}
                    onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })} required />
                <input placeholder="Password" value={newEmp.password} type="password"
                    onChange={(e) => setNewEmp({ ...newEmp, password: e.target.value })} required />
                <button type="submit">Add Employee</button>
            </form>

            <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: "20px" }}>
                <thead>
                    <tr><th>Name</th><th>Email</th><th>Action</th></tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp._id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>
                                <button onClick={() => handleDeleteEmployee(emp._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ── REVIEWS ── */}
            <hr />
            <h3>Performance Reviews</h3>

            <form onSubmit={handleCreateReview} style={{ marginBottom: "10px" }}>
                <input placeholder="Title"       value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })} required />
                <input placeholder="Description" value={newReview.description}
                    onChange={(e) => setNewReview({ ...newReview, description: e.target.value })} required /> 
                <button type="submit">Create Review</button>
            </form>

            <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: "20px" }}>
                <thead>
                    <tr><th>Title</th><th>Description</th></tr>
                </thead>
                <tbody>
                    {reviews.map((rev) => (
                        <tr key={rev._id}>
                            <td>{rev.title}</td>
                            <td>{rev.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ── ASSIGNMENTS ── */}
            <hr />
            <h3>Assign Reviewer</h3>

            <form onSubmit={handleAssign}>
                <select value={assignment.review}
                    onChange={(e) => setAssignment({ ...assignment, review: e.target.value })} required>
                    <option value="">Select Review</option>
                    {reviews.map((r) => (
                        <option key={r._id} value={r._id}>{r.title}</option>
                    ))}
                </select>

                <select value={assignment.reviewer}
                    onChange={(e) => setAssignment({ ...assignment, reviewer: e.target.value })} required>
                    <option value="">Select Reviewer (gives feedback)</option>
                    {employees.map((e) => (
                        <option key={e._id} value={e._id}>{e.name}</option>
                    ))}
                </select>

                <select value={assignment.reviewee}
                    onChange={(e) => setAssignment({ ...assignment, reviewee: e.target.value })} required>
                    <option value="">Select Reviewee (being reviewed)</option>
                    {employees.map((e) => (
                        <option key={e._id} value={e._id}>{e.name}</option>
                    ))}
                </select>

                <button type="submit">Assign</button>
            </form>
        </div>
    );

}
export default AdminDashboard;