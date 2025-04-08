import React, { useState, useEffect } from "react";
import { db } from "./firebase"; // Pastikan konfigurasi Firebase sudah benar
import { collection, getDocs } from "firebase/firestore";

const AKEvent = () => {
  const [events, setEvents] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 720);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "AKEvent"));
        const eventList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();

    // Deteksi perubahan ukuran layar
    const handleResize = () => setIsMobile(window.innerWidth < 720);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fungsi untuk memformat tanggal
  const formatDate = (start, end) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" };
    return `${new Date(start.seconds * 1000).toLocaleString("id-ID", options)} - ${new Date(end.seconds * 1000).toLocaleString("id-ID", options)}`;
  };

  return (
    <div>
      {events.map(event => (
        <div key={event.id} style={styles.card}>
          {/* Gambar dengan efek hover */}
          <div style={isMobile ? styles.imageContainerMobile : styles.imageContainer} className="imageContainer">
            <img src={event.eventImage} alt={event.eventName} style={styles.image} />
            <div className="overlay">
              <div className="textContainer">
                <h3 style={styles.title}>{event.eventName}</h3>
                <p style={styles.date}>{formatDate(event.eventStart, event.eventEnd)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Gaya CSS dalam objek
const styles = {
  card: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  imageContainer: {
    width: "700px",
    height: "300px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "10px",
  },
  imageContainerMobile: {
    width: "350px",
    height: "150px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "10px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "top",
    transition: "filter 0.3s ease",
  },
  title: {
    margin: "0",
    fontSize: "18px",
    fontWeight: "bold",
  },
  date: {
    fontSize: "14px",
  },
};

// Tambahkan efek hover menggunakan CSS
const styleTag = document.createElement("style");
styleTag.innerHTML = `
  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    transition: background 0.3s ease;
  }

  .textContainer {
    position: absolute;
    bottom: 15px;
    left: 15px;
    color: #fff;
    opacity: 0; /* Teks awalnya disembunyikan */
    transition: opacity 0.3s ease;
  }

  .imageContainer:hover .overlay {
    background: rgba(0, 0, 0, 0.5); /* Gelapkan gambar saat hover */
  }

  .imageContainer:hover .textContainer {
    opacity: 1; /* Tampilkan teks saat hover */
  }
`;
document.head.appendChild(styleTag);

export default AKEvent;
