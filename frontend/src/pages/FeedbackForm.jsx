import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios.js";

const FeedbackForm = () => {
    const navigate = useNavigate();
    const { assignmentId } = useParams();
    const [comments, setComments] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post(`/feedbacks/${assignmentId}`, { comments });
        navigate("/employee");
    }

    return (
        <div style={{ padding: "20px" }}>
            
            <h2>Submit Feedback</h2>
            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "10px" }}>
                    <label>Comments:</label><br />
                    <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Enter your comments here..."
                    />
                </div>
                <button type="submit">Submit Feedback</button>
            </form>
                <button onClick={() => navigate("/employee")} style={{ marginTop: "10px" }}>Back to Dashboard</button>

        </div>

    )
}
export default FeedbackForm;