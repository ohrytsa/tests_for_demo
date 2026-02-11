import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Rundom from "./components/Rundom";
import Contact from "./components/Contact";
import PredictionListener from "./components/PredictionListener";

const App = () => (
  <BrowserRouter>
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <nav
        style={{
          backgroundColor: "#333",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "20px",
            padding: "0",
            margin: "0",
          }}
        >
          <li>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/rundom" style={linkStyle}>
              Random
            </Link>
          </li>
          <li>
            <Link to="/contact" style={linkStyle}>
              Contacts
            </Link>
          </li>
        </ul>
      </nav>

      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/rundom"
            element={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Rundom />
                <PredictionListener />
              </div>
            }
          />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
};

export default App;
