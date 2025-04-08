import React, { useState, useEffect, useRef } from "react";
import { db, collection, getDocs } from "./firebase";
import BuyModule from "./BuyModule";

const AKAkunMobile = () => {
  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [visibleAccounts, setVisibleAccounts] = useState([]); // Lazy Loaded Data
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("id"); // Default sorting by ID
  const [expandedCard, setExpandedCard] = useState(null);
  const observerRef = useRef(null); // Intersection Observer

  const akAccountRef = collection(db, "AKAccount");

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    filterAndSortAccounts();
  }, [searchTerm, sortOrder, accounts]);

  useEffect(() => {
    if (filteredAccounts.length > 0) {
      setupLazyLoading();
    }
  }, [filteredAccounts]);

  const fetchAccounts = async () => {
    const snapshot = await getDocs(akAccountRef);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setAccounts(data);
  };

  const filterAndSortAccounts = () => {
    let filtered = accounts.filter((acc) =>
      acc.operator.some((op) =>
        op.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      // Default sorting by ID (string comparison)
      filtered.sort((a, b) => a.id.localeCompare(b.id));
    }

    setFilteredAccounts(filtered);
  };

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleBuyClick = (account) => {
    setSelectedAccount(account);
    setShowModal(true);
  };

  const setupLazyLoading = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newIndex = parseInt(entry.target.dataset.index);
            setVisibleAccounts((prev) => [
              ...prev,
              filteredAccounts[newIndex],
            ]);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "50px" }
    );

    observerRef.current = observer;

    document.querySelectorAll(".lazy-load").forEach((el) => {
      observer.observe(el);
    });
  };

  return (
    <div
      className="container mt-6"
      style={{ maxWidth: "95%", marginTop: "80px", marginBottom: "60px" }}
    >
      <BuyModule
        show={showModal}
        handleClose={() => setShowModal(false)}
        selectedAccount={selectedAccount}
      />

      {/* Pencarian & Sorting dalam Tata Letak Vertikal */}
      <div className="d-flex flex-column mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Cari Operator..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="id">Urutkan</option>
          <option value="asc">Harga Terendah</option>
          <option value="desc">Harga Tertinggi</option>
        </select>
      </div>

      {/* Daftar Akun dengan Lazy Loading */}
      <div className="d-flex flex-column">
        {filteredAccounts.map((acc, index) => (
          <div
            key={acc.id}
            className="lazy-load"
            data-index={index}
            style={{ minHeight: "200px" }}
          >
            {visibleAccounts.includes(acc) && (
              <div
                className="card mb-3 w-100 border-dark border-1 fade-in"
                style={{
                  animation: "fadeIn 0.5s ease-in-out",
                }}
              >
                <div className="card-body p-3">
                  {/* Operator & Info Utama */}
                  <h5 className="card-title fw-bold text-uppercase">
                    {acc.operator.join(", ")}
                  </h5>
                  <p className="text-muted small mb-0">{acc.id}</p>
                  <p className="card-text">
                    <strong>Level:</strong> {acc.level} |{" "}
                    <strong>Story:</strong> {acc.story} <br />
                    <strong>Orundum:</strong> {acc.orundum} |{" "}
                    <strong>Originite:</strong> {acc.originite} <br />
                    <strong>Detail:</strong> {acc.detail}
                  </p>

                  {/* Tombol Beli & Harga */}
                  <button
                    className="btn btn-warning w-100"
                    onClick={() => handleBuyClick(acc)}
                  >
                    Beli!
                  </button>
                  <p className="text-dark mt-1 mb-0 text-center fw-bold">
                    Rp.{acc.price}
                  </p>
                </div>

                {/* Bagian Dropdown Detail */}
                {expandedCard === acc.id && (
                  <div className="card-footer">
                    <div className="d-flex flex-column align-items-center">
                      {acc.image1 && (
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: "100%",
                            aspectRatio: "2 / 1",
                            backgroundColor: "white",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={acc.image1}
                            alt="Gambar 1"
                            className="img-fluid"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      )}
                      {acc.image2 && (
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{
                            width: "100%",
                            aspectRatio: "2 / 1",
                            backgroundColor: "white",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={acc.image2}
                            alt="Gambar 2"
                            className="img-fluid"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tombol Lihat Detail */}
                <button
                  className="btn btn-light w-100 p-1"
                  onClick={() => toggleCard(acc.id)}
                >
                  {expandedCard === acc.id ? "Tutup detail" : "Lihat lebih.."}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Animasi Fade In */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AKAkunMobile;
