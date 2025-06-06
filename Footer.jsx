import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © 2024 RFPC | v1.0.0 | &nbsp;
        <a href="/" style={styles.link}>Halo Admin!</a>
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#2d2d2d",
    color: "#fff",
    textAlign: "center",
    padding: "10px 0",
    fontSize: "14px",
  },
  text: {
    margin: 0,
  },
};

export default Footer;
