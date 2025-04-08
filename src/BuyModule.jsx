import React from "react";
import { Modal, Button } from "react-bootstrap";

const BuyModule = ({ show, handleClose, selectedAccount }) => {
  if (!selectedAccount) return null;

  const { operator, id, price } = selectedAccount;

  // Batasi panjang teks operator (maks 38 karakter) dengan efek fading
  const formattedOperator =
    operator.join(", ").length > 30
      ? operator.join(", ").slice(0, 35) + ".."
      : operator.join(", ");

  const whatsappLink = `https://wa.me/6287722752946?text=Halo%20Admin,%20saya%20ingin%20membeli%20akun%20dengan%20ID:%20${id}%20seharga%20Rp.${price}`;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-4" style={{ width: "100%",}}>
        <h5 className="text-center mb-3" style={{ fontWeight: "bold"}}>
          {formattedOperator}
        </h5>
        <p className="text-center text-muted"> Akun ID: {id}</p>
        <h6 className="text-center text-dark">Rp.{price}</h6>
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="success"
            href={whatsappLink}
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
