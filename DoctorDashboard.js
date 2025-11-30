import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    setDoctor(current || null);

    const allAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    // show only appointments for this doctor
    if (current && current.role === "doctor") {
      const myAppointments = allAppointments.filter(
        (a) => a.doctorEmail === current.email
      );
      setAppointments(myAppointments);
    } else {
      setAppointments([]);
    }
  }, []);

  const updateAppointmentsBoth = (updated) => {
    setAppointments(updated);

    const all = JSON.parse(localStorage.getItem("appointments")) || [];
    if (!doctor) return;

    const newAll = all.map((a) =>
      a.doctorEmail === doctor.email
        ? updated.find((u) => u.id === a.id) || a
        : a
    );
    localStorage.setItem("appointments", JSON.stringify(newAll));
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updated = appointments.map((appt) =>
      appt.id === id ? { ...appt, status: newStatus } : appt
    );
    updateAppointmentsBoth(updated);
  };

  // if not logged in as doctor
  if (!doctor || doctor.role !== "doctor") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f7ff",
          fontFamily: "Arial",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            background: "#b06ab3",
            color: "#fff",
            padding: "15px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Doctor Portal</h2>
          <nav>
            <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>
              Home
            </Link>
            <Link to="/login" style={{ color: "#fff" }}>
              Login
            </Link>
          </nav>
        </header>
        <main
          style={{
            padding: "40px 30px",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          <p>
            Please login as a <b>Doctor</b> to view this page.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial",
        background: "#f5f7ff",
      }}
    >
      <header
        style={{
          background: "#b06ab3",
          color: "#fff",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Doctor Dashboard</h2>
        <nav>
          <span style={{ marginRight: "20px", fontSize: "14px" }}>
            Logged in as: <b>{doctor.name}</b>
          </span>
          <Link to="/" style={{ color: "#fff", marginRight: "15px" }}>
            Home
          </Link>
          <Link
            to="/login"
            style={{ color: "#fff" }}
            onClick={() => localStorage.removeItem("currentUser")}
          >
            Logout
          </Link>
        </nav>
      </header>

      <main style={{ padding: "20px 30px", flex: 1 }}>
        <section
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Your Appointments</h3>
          {appointments.length === 0 ? (
            <p style={{ fontSize: "14px", color: "#555" }}>
              No appointments booked for you yet.
            </p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "15px",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ background: "#f0f0f8" }}>
                  <th style={{ padding: "8px", textAlign: "left" }}>Patient</th>
                  <th style={{ padding: "8px", textAlign: "left" }}>Date</th>
                  <th style={{ padding: "8px", textAlign: "left" }}>Time</th>
                  <th style={{ padding: "8px", textAlign: "left" }}>
                    Problem Description
                  </th>
                  <th style={{ padding: "8px", textAlign: "left" }}>Status</th>
                  <th style={{ padding: "8px", textAlign: "left" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                    >
                      {appt.patientName}
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                    >
                      {appt.date}
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                    >
                      {appt.time}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        borderBottom: "1px solid #eee",
                        maxWidth: "260px",
                      }}
                    >
                      {appt.problem || "-"}
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                    >
                      {appt.status}
                    </td>
                    <td
                      style={{ padding: "8px", borderBottom: "1px solid #eee" }}
                    >
                      <button
                        onClick={() =>
                          handleUpdateStatus(appt.id, "Confirmed")
                        }
                        style={{
                          marginRight: "5px",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          border: "none",
                          background: "#2ecc71",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(appt.id, "Cancelled")
                        }
                        style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          border: "none",
                          background: "#e74c3c",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}
