import React from 'react'
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleSignin = () => {
    navigate("/login");
  };
  const handleHomepage = () => {
    navigate("/");
  };

  return (
    <>
      <nav
      className="navbar navbar-expand-lg navbar-light fixed-top bg-white text-center"
    >
      <div className="container">
        <a className="navbar-brand" onClick={handleHomepage}
          ><img src={require("../../assets/Tickitz 2.png")} alt="logo"
        /></a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li><hr className="dropdown-divider" /></li>
            <li className="nav-item">
              <a className="nav-link" onClick={handleHomepage}>Home</a>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li className="nav-item">
              <a className="nav-link" href="#">List Movie</a>
            </li>
            <li><hr className="dropdown-divider" /></li>
          </ul>
          <a>
            <button
              className="btn btn-outline-success bg-white"
              onClick={handleSignin}
              type="submit"
            >
              Sign in
            </button>
          </a>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li><hr className="dropdown-divider" /></li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar