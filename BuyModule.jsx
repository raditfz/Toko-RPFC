import React from "react";
import { Modal, Button } from "react-bootstrap";

const BuyModule = ({ show, handleClose, selectedAccount }) => {
  if (!selectedAccount) return null;

  const { operator, id, price } = selectedAccount;

  const formattedOperator =
    operator.join(", ").length > 30
      ? operator.join(", ").slice(0, 35) + ".."
      : operator.join(", ");

  // Nomor WhatsApp admin (ganti sesuai nomor kamu)
  const adminPhoneNumber = "6287722752946";

  // Pesan WhatsApp hanya ID dan harga
  const whatsappMessage = `Halo, saya ingin membeli akun:\nID: ${id}\nHarga: Rp.${price}`;

  // URL WhatsApp
  const whatsappURL = `https://wa.me/${adminPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-4" style={{ width: "100%" }}>
        <h5 className="text-center mb-3" style={{ fontWeight: "bold" }}>
          {formattedOperator}
        </h5>
        <p className="text-center text-muted">Akun ID: {id}</p>
        <h6 className="text-center text-dark">Rp.{price}</h6>
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="success"
            href={whatsappURL}
            target="_blank"
            className="w-75"
          >
            Hubungi Admin!
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BuyModule;
