import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // stop page refresh

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // get existing users from localStorage
    const existing = JSON.parse(localStorage.getItem("users")) || [];

    // check if email already exists
    const already = existing.find((u) => u.email === email);
    if (already) {
      alert("Email already registered. Please login.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      specialization: role === "doctor" ? specialization : "",
    };

    const updated = [...existing, newUser];
    localStorage.setItem("users", JSON.stringify(updated));

    alert("Registered successfully! Please login.");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #11998e, #38ef7d)",
        fontFamily: "Arial",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          width: "380px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Register
        </h2>

        <label>Full Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        />

        <label>Register as</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        {role === "doctor" && (
          <>
            <label>Specialization</label>
            <input
              type="text"
              placeholder="e.g. Cardiologist"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "15px",
                marginTop: "5px",
              }}
            />
          </>
        )}

        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        />

        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            marginTop: "5px",
          }}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "20px",
            marginTop: "5px",
          }}
        />

        <button
          type="submit"  // IMPORTANT: must be submit
          style={{
            width: "100%",
            padding: "10px",
            background: "#11998e",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Register
        </button>

        <p style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
