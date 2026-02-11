import React from "react";
import { TestingAPICall } from "./TestApiCall";

const Contact = () => (
  <div style={{ textAlign: "center", maxWidth: "600px" }}>
    <address
      style={{
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333",
        marginTop: "10px",
      }}
    >
      <TestingAPICall />
    </address>
  </div>
);

export default Contact;
