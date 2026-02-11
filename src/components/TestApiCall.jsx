import React, { useEffect, useState } from "react";
import { FetchData } from "../utils/servises";
import { styles } from "./TestApiCall.styles";

export const TestingAPICall = () => {
  const [data, setData] = useState([]);
  const [phoneNumbers, setPhoneNumbers] = useState({});
  const [buttonVisibility, setButtonVisibility] = useState({});

  useEffect(() => {
    FetchData().then((data) => {
      setData(data);
    });
  }, []);

  const addPhoneNumber = (id, phone) => {
    setPhoneNumbers((prevState) => ({
      ...prevState,
      [id]: phone,
    }));

    setButtonVisibility((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Friends</h2>
      {data.map((item) => (
        <div key={item.id} data-testid="user" style={styles.userCard}>
          <div style={styles.userName}>{item.name}</div>
          <div style={styles.userEmail}>{item.email}</div>
          {phoneNumbers[item.id] && (
            <div style={styles.phoneText}>
              📱 Phone: {phoneNumbers[item.id]}
            </div>
          )}
          {!buttonVisibility[item.id] && (
            <button
              onClick={() => addPhoneNumber(item.id, item.phone)}
              data-testid="add-phone"
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.background = "#dd6b20")}
              onMouseLeave={(e) => (e.target.style.background = "#ed8936")}
            >
              Show Phone Number
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
