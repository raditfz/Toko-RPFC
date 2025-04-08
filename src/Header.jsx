import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
const navigate = useNavigate();
  return (
    <header style={styles.header}>
      {/* Bagian Kiri - Logo */}
      <div style={styles.leftSection}>
        <img src="/assets/logo-rfpc.png" alt="Logo" style={styles.logo} />
      </div>

      {/* Bagian Kanan - Button */}
      <div style={styles.rightSection}>
        <button style={styles.button} onClick={() => navigate("/")}>Home</button>
        <button style={styles.button} onClick={() => navigate("/beli-akun")}>Beli Akun</button>
      </div>
    </header>
  );
};

// Gaya CSS dalam objek
const styles = {
  header: {
    position: "fixed", // Tetap di atas
    top: 0,
    left: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#2d2d2d",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000, // Agar selalu di atas elemen lain
  },
  leftSection: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "40px", // Sesuaikan ukuran logo
  },
  rightSection: {
    display: "flex",
    gap: "10px",
  },
  button: {
    backgroundColor: "transparent",
    border: "none",
    color: "#ffc107",
    fontSize: "16px",
    cursor: "pointer",
    padding: "10px 15px",
    transition: "color 0.3s ease-in-out",
  },
};

export default Header;
