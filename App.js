import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
