import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const EmployeeDashboard = () => {
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAssignments();
    }, []);

    const fetchAssignments = async () => {  
        const res = await api.get("/assignments/my");
        setAssignments(res.data);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
         <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>My Assigned Reviews</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>

            {assignments.length === 0 && <p>No reviews assigned yet.</p>}

            <table border="1" cellPadding="8" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>Review Title</th>
                        <th>Reviewee</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((a) => (
                        <tr key={a._id}>
                            <td>{a.review?.title}</td>
                            <td>{a.reviewee?.name}</td>
                            <td>{a.status}</td>
                            <td>
                                {a.status === "pending" ? (
                                    <button onClick={() => navigate(`/feedback/${a._id}`)}>
                                        Give Feedback
                                    </button>
                                ) : (
                                    <span>✅ Submitted</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeDashboard;