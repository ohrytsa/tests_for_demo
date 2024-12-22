import React, { useEffect, useState } from "react";
import { FetchData } from "../utils/servises";

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
    <div>
      {data.map((item) => (
        <div key={item.id} data-testid="user">
          {item.name} - {item.email}
          {phoneNumbers[item.id] && (
            <span> - Phone: {phoneNumbers[item.id]}</span>
          )}
          {!buttonVisibility[item.id] && (
            <button
              onClick={() => addPhoneNumber(item.id, item.phone)}
              data-testid="add-phone"
            >
              Add Phone
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
