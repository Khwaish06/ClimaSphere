import Search from "./searchBox.jsx";
import "./App.css";

export default function Navbar({ setResult }) {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm py-3 px-3 sticky-top" style={{ backgroundColor: "#e9f3ff" }}>
      <div className="container-fluid">
        {/* Brand Logo */}
        <div className="d-flex align-items-center">
          <i className="fa-solid fa-cloud me-2 fs-3 text-primary"></i>
          <span className="text-primary pacifico-regular fs-3 fw-semibold">
            <u>ClimaSphere</u>
          </span>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSearch"
          aria-controls="navbarSearch"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Search Component */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarSearch">
          <div className="ms-lg-auto mt-3 mt-lg-0 d-flex align-items-center">
            <Search setResult={setResult} />
          </div>
        </div>
      </div>
    </nav>
  );
}
