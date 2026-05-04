import { useState } from 'react'
import { Route , Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import FeedbackForm from "./pages/FeedbackForm.jsx";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/feedback/:assignmentId" element={<FeedbackForm />} />
    </Routes>
    </>
  )
}

export default App
