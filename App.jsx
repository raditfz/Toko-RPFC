import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import AKAkunDesk from "./AKAkunDesk";
import AKAkunMobile from "./AKAkunMobile";
import DeviceRedirect from "./DeviceRedirect";

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === "/mauakses" || location.pathname === "/mauakses/nihakses";

  return (
    <>
      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beli-akun" element={<DeviceRedirect />} />
        <Route path="/beli-akun-d" element={<AKAkunDesk />} />
        <Route path="/beli-akun-m" element={<AKAkunMobile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
