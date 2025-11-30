import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "Arial",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4bc0c8, #c779d0, #feac5e)",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
        Online Medical Consultation
      </h1>

      <p style={{ fontSize: "18px", maxWidth: "600px", marginBottom: "30px" }}>
        Book appointments, consult doctors virtually, and manage your health
        from anywhere. A complete virtual healthcare system at your fingertips.
      </p>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/login"
          style={{
            padding: "12px 25px",
            background: "#ffffff",
            color: "#000",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{
            padding: "12px 25px",
            background: "#000",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
