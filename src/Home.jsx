import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AKEvent from "./AKEvent";

const Home = () => {
    const navigate = useNavigate();

    const handleScrollToEvent = () => {
        window.scrollBy({ top: 680, behavior: "smooth" });
      };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 720);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
    <div style={isMobile ? styles.mobileContainer : styles.container}>
      {/* Bagian Teks */}
      <div style={styles.textSection}>
        <h1 style={{fontWeight:"bolder"}}>BELI AKUN ARKNIGHTS</h1>
        <p style={{fontSize:"19px"}}>CARI AKUN YANG COCOK UNTUKMU!</p>
        <p style={{marginTop:"-18px", fontSize:"16px"}}>AKUN CEPAT, PROSES HEMAT, HARGA AMAN</p>
        <p style={{marginBottom:"0px", fontSize:"16px"}}>Pembayaran Yang Tersedia:</p>
        <div style={styles.logoContainer}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png" alt="Dana" style={isMobile ? styles.mobileLogo : styles.logo} />
          <img src="https://antinomi.org/wp-content/uploads/2022/03/logo-gopay-vector.png" alt="GoPay" style={isMobile ? styles.mobileLogo : styles.logo} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1200px-Bank_Central_Asia.svg.png" alt="BCA" style={isMobile ? styles.mobileLogo : styles.logo} />
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Logo_BRI.png" alt="BRI" style={isMobile ? styles.mobileLogo : styles.logo} />
        </div>
      </div>

      {/* Bagian Tombol */}
      <div style={styles.buttonSection}>
        <p style={{fontWeight:"bold",color:"white"}}> Mau Cari Apa Hari Ini? </p>
        <CustomButton
        text="Event List"
        hoverText="Ada Event Apa Ya Sekarang?"
        imgSrc1="/assets/may2.png"
        imgSrc2="/assets/may1.png"
        onClick={handleScrollToEvent}/>
        <CustomButton
        text="Starter Account"
        hoverText="Cari Akun buat Pemain Baru!"
        imgSrc1="/assets/amiya2.png"
        imgSrc2="/assets/amiya1.png"
        onClick={() => navigate("/beli-akun")}/>
        <CustomButton
        text="Limited Account"
        hoverText="Cari Akun Karakter Limited!"
        imgSrc1="/assets/limited2.png"
        imgSrc2="/assets/limited1.png"
        onClick={() => navigate("/beli-akun")}/>
      </div>
      
      
    </div>
    <div style={styles.eventContainer}>
        <p style={{fontSize:"24px"}}>Event Arknights Saat Ini:</p>
        <AKEvent />
      </div>
    </div>
  );
};

// 🔹 Komponen Tombol yang Bisa Digunakan Kembali
const CustomButton = ({ text, hoverText, imgSrc1, imgSrc2, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
    onClick={onClick} 
      style={{
        ...styles.buttonContainer,
        justifyContent: isHovered ? "flex-start" : "flex-end",
        backgroundColor: isHovered ? "#000" : "#fff",
        color: isHovered ? "#fff" : "#000",
        width: isHovered ? "78%" : "60%",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div style={styles.imgContainer}>
          <img src={imgSrc1} alt="Hovered" style={styles.img} />
        </div>
      )}
        <div style={styles.textContainer}>{isHovered ? hoverText : text}</div>
      {!isHovered && (
        <div style={styles.imgContainer}>
          <img src={imgSrc2} alt="Default" style={styles.img} />
        </div>
      )}
    </button>
  );
};

// Gaya CSS dalam objek
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    flexDirection: "row", // Default: Desktop (horizontal)
  },
  mobileContainer: {
    display: "flex",
    height: "100vh",
    flexDirection: "column", // Mobile: ubah jadi vertikal
    marginBottom: "20px",
  },
  textSection: {
    flex: 6, // Desktop 70%, Mobile 50%
    backgroundColor: "#ffc107",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  buttonSection: {
    flex: 4, // Desktop 30%, Mobile 50%
    backgroundColor: "#343a40",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
    transition: "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
    width: "0",
    height: "50px",
  },
  imgContainer: {
    width: "50px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.5s ease-in-out",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.2s ease-in-out",
  },
  textContainer: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    transition: "color 0.2s ease-in-out",
  },

  eventContainer: {
    marginTop: "20px", // 🔹 Jarak antara tombol & event
    marginBottom: "60px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  logoContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
    flexWrap: "wrap", // Agar responsif di mobile
  },
  logo: {
    width: "100px",
    height: "36px",
  },
  mobileLogo: {
    width: "70px", // Ukuran lebih kecil di mobile
    height: "26px",
  },

};

export default Home;
