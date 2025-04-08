import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeviceRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const screenWidth = window.innerWidth;

    // 🔹 Deteksi apakah pengguna menggunakan perangkat mobile
    const isMobile = /android|iphone|ipad|ipod|blackberry|opera mini|iemobile|mobile/i.test(userAgent);

    if (isMobile || screenWidth < 720) {
      navigate("/beli-akun-m"); // 🔹 Redirect ke versi Mobile
    } else {
      navigate("/beli-akun-d"); // 🔹 Redirect ke versi Desktop
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
};

export default DeviceRedirect;