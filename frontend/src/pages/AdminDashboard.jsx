import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";


const AdminDashboard = () => {
    const [newEmployee, setNewEmployee] = useState({ name: "", email: "", password: "" });
    const [Employees, getEmployees] = useState([]);
    const [Id, setDeleteId] = useState("");
    const [reviewData, setReviewData] = useState({ title: "", description: "", createdBy: "" });
    const [Reviews, getReviews] = useState([]);
    const [updateReview, setUpdateReview] = useState({ title: "", description: "" });




    const handleCreateEmloyee = async (e) => {
        e.preventDefault();
        try {
            await api.post("/employees", newEmployee);
            alert("Employee created successfully");
            setNewEmployee({ name: "", email: "", password: "" });
            fetchAllEmployees();
        } catch (error) {
            alert(error.response.data.message || "Failed to create employee");
        }

    };

    const fetchAllEmployees = async (e) => {
        e.preventDefault();
        try {
            const allEmployees = await api.get("/employees");
            getEmployees(allEmployees.data);
        }
        catch (error) {
            alert(error.response.data.message || "Failed to fetch employees");
        }
    }

    const handleDeleteEmployee = async (id) => {
        try {
            await api.delete(`/employees/${id}`);
            fetchAllEmployees();
        } catch (error) {
            alert(error.response.data.message || "Failed to delete employee");
        }
    };


    const handleCreateReview = async (e) => {
        e.preventDefault();

        try {
            await api.post("/reviews", {
                title: reviewData.title,
                description: reviewData.description,
                createdBy: localStorage.getItem("id"),
            });

            alert("Review Created Successfully");
        } catch (error) {
            console.error(error);
            console.log("Review Data:", reviewData);
            alert(error.response.data.message || "Failed to create review");    
        }
    };

    const handleGetAllReviews = async (e) => {
        e.preventDefault();
        try {
            const allReview = await api.get("/reviews");
            console.log(allReview.data);
            getReviews(allReview.data);
        } catch (error) {
            console.error(error);
            alert(error.response.data.message || "Failed to fetch reviews");
        }
    };

    const handleUpdateReview = async (id) => {
        try {
            await api.put(`/reviews/${id}`, {
                title: reviewData.title,
                description: reviewData.description
            });
            handleGetAllReviews();
        } catch (error) {
            console.error(error);
            alert(error.response.data.message || "Failed to update review");
        }
    };

    return (
        <div>
            <div>
                <h2>Admin Dashboard</h2>
                <h3>Create New Employee</h3>
                <form onSubmit={handleCreateEmloyee}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newEmployee.name}
                        onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newEmployee.password}
                        onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                    />
                    <button type="submit">Create Employee</button>
                </form>
            </div>


            <div>
                <h3>All Employees</h3>

                <button onClick={fetchAllEmployees}>Fetch Employees</button>
                <ul>
                    {Employees.map((employee) => (
                        <li key={employee._id}>{employee.name} - {employee.email}</li>
                    ))}
                </ul>

            </div>

            <div>
                <h3>Delete Employee</h3>
                <input
                    type="text"
                    placeholder="Employee ID"
                    value={Id}
                    onChange={(e) => setDeleteId(e.target.value)}
                />
                <button onClick={() => handleDeleteEmployee(Id)}>Delete Employee</button>

            </div>

            <div>
                <h3>Create Review</h3>
                <form onSubmit={handleCreateReview}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={reviewData.title}
                        onChange={(e) => setReviewData({ ...reviewData, title: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={reviewData.description}
                        onChange={(e) => setReviewData({ ...reviewData, description: e.target.value })}
                    />
                    <input
                        type="text"
                        value={localStorage.getItem("id")}
                        disabled
                    />
                    <button type="submit">Create Review</button>
                </form>
            </div>


            <div>
                <h3>All Reviews</h3>
                <button onClick={handleGetAllReviews}>Fetch Reviews</button>
                <ul>
                    {Reviews.map((review) => (
                        <li key={review._id}>{review.title} - {review.description}</li>
                    ))}
                </ul>

            </div>

            {/* <div>
                <h3>Update Review</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={reviewData.title}
                    onChange={(e) => setReviewData({ ...reviewData, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={reviewData.description}
                    onChange={(e) => setReviewData({ ...reviewData, description: e.target.value })}
                />
                <button onClick={() => handleUpdateReview(reviewData._id)}>Update Review</button>
            </div> */}

        </div>



    )

}
export default AdminDashboard;