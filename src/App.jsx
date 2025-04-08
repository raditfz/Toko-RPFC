import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import AKAkunDesk from "./AKAkunDesk";
import AKAkunMobile from "./AKAkunMobile";
import DeviceRedirect from "./DeviceRedirect"; // 🔹 Komponen pendeteksi perangkat

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Home sebagai halaman default */}
        <Route path="/" element={<Home />} />

        {/* 🔹 Rute yang akan mendeteksi perangkat terlebih dahulu */}
        <Route path="/beli-akun" element={<DeviceRedirect />} />

        {/* 🔹 Rute untuk Desktop */}
        <Route path="/beli-akun-d" element={<AKAkunDesk />} />

        {/* 🔹 Rute untuk Mobile */}
        <Route path="/beli-akun-m" element={<AKAkunMobile />} />

        {/* Redirect jika halaman tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
