import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [problem, setProblem] = useState("");  // NEW FIELD

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== "patient") {
      navigate("/login");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const docs = users.filter((u) => u.role === "doctor");
    setDoctors(docs);

    const allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const myAppointments = allAppointments.filter(
      (a) => a.patientEmail === user.email
    );
    setAppointments(myAppointments);
  }, [navigate]);

  const openBookingModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    if (!date || !time || !problem.trim()) {
      return; // no alerts (clean UI)
    }

    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    const newAppointment = {
      id: Date.now(),
      doctorName: selectedDoctor.name,
      doctorEmail: selectedDoctor.email,
      doctorSpecialization: selectedDoctor.specialization,
      patientName: user.name,
      patientEmail: user.email,
      date,
      time,
      problem,           // SAVE PROBLEM DESCRIPTION
      status: "Pending",
    };

    const existing = JSON.parse(localStorage.getItem("appointments")) || [];
    const updated = [...existing, newAppointment];
    localStorage.setItem("appointments", JSON.stringify(updated));

    setAppointments((prev) => [...prev, newAppointment]);

    // reset form
    setShowModal(false);
    setDate("");
    setTime("");
    setProblem("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6fb",
        fontFamily: "Arial",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          background: "#4568dc",
          padding: "15px 30px",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Patient Dashboard</h2>
        <nav>
          <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>
            Home
          </Link>
          <Link to="/login" style={{ color: "#fff" }} onClick={() => localStorage.removeItem("currentUser")}>
            Logout
          </Link>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ padding: "20px 30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
          {/* DOCTOR LIST */}
          <section
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Available Doctors</h3>
            <ul style={{ padding: 0, marginTop: "15px", listStyle: "none" }}>
              {doctors.map((doc) => (
                <li
                  key={doc.id}
                  style={{
                    padding: "12px",
                    marginBottom: "12px",
                    background: "#f7f7f7",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <b>{doc.name}</b>
                    <div style={{ fontSize: "14px", color: "#666" }}>
                      {doc.specialization}
                    </div>
                  </div>
                  <button
                    style={{
                      padding: "6px 12px",
                      background: "#4568dc",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                    }}
                    onClick={() => openBookingModal(doc)}
                  >
                    Book Appointment
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* APPOINTMENTS */}
          <section
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Your Appointments</h3>
            {appointments.map((appt) => (
              <div
                key={appt.id}
                style={{
                  padding: "12px",
                  borderBottom: "1px solid #ddd",
                  marginBottom: "10px",
                }}
              >
                <b>{appt.doctorName}</b> ({appt.doctorSpecialization})  
                <div>{appt.date} at {appt.time}</div>
                <div style={{ fontSize: "13px", marginTop: "5px" }}>
                  <b>Your Problem:</b> {appt.problem}
                </div>
                <div
                  style={{
                    marginTop: "6px",
                    color:
                      appt.status === "Pending"
                        ? "#e67e22"
                        : appt.status === "Confirmed"
                        ? "green"
                        : "red",
                  }}
                >
                  Status: {appt.status}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>

      {/* BOOKING POPUP */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "350px",
              background: "#fff",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
            }}
          >
            <h3>Book Appointment</h3>
            <p>
              <b>Doctor:</b> {selectedDoctor?.name} <br />
              <b>Specialization:</b> {selectedDoctor?.specialization}
            </p>

            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "12px",
                marginTop: "4px",
              }}
            />

            <label>Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "12px",
                marginTop: "4px",
              }}
            />

            {/* NEW PROBLEM DESCRIPTION FIELD */}
            <label>Describe Your Problem</label>
            <textarea
              placeholder="Eg: Fever, headache since 2 days..."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "6px",
                marginBottom: "15px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            ></textarea>

            <button
              onClick={handleConfirmBooking}
              style={{
                width: "100%",
                padding: "10px",
                background: "#4568dc",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Confirm Booking
            </button>

            <button
              onClick={() => setShowModal(false)}
              style={{
                width: "100%",
                padding: "10px",
                background: "#ccc",
                border: "none",
                borderRadius: "6px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
