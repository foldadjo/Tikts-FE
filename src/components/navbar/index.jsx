import React, { useState } from "react";
import { useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import "./index.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let dataUser = localStorage.getItem("dataUser");
  dataUser = JSON.parse(dataUser);
  // console.log(dataUser)
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleHomepage = () => {
    navigate("/");
  };
  const handleViewall = () => {
    navigate("/viewall");
  };
  const handlemanageSchedule = () => {
    navigate("/manageschedule");
  };
  const handlemanageMovie = () => {
    navigate("/managemovie");
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-white">
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-white text-center">
        <div className="container">
          <a className="navbar-brand" onClick={handleHomepage}>
            <img src={require("../../assets/Tickitz 2.png")} alt="logo" />
          </a>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleHomepage}>
                    Home
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleViewall}>
                    List Movie
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            ) : dataUser.role !== "admin" ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleHomepage}>
                    Home
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleViewall}>
                    List Movie
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handleDashboard}>
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handlemanageMovie}>
                    Manage Movie
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={handlemanageSchedule}>
                    Manage Schedule
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            )}
            <a>
              {!token ? (
                <button
                  className="btn btn-outline-success bg-white"
                  onClick={() => handleLogout()}
                  type="submit"
                >
                  Sign Up
                </button>
              ) : (
                <div>
                  <button
                    className="btn btn-outline-success bg-white"
                    onClick={() => handleLogout()}
                    type="submit"
                  >
                    Log out
                  </button>
                  <img
                    onClick={() => handleProfile()}
                    className="profileImage"
                    src={
                      dataUser.image !== ("" || undefined)
                        ? `https://res.cloudinary.com/fazztrack/image/upload/v1650942515/${dataUser.image}`
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="image"
                  />
                </div>
              )}
            </a>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li>
                <hr className="dropdown-divider" />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <script
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
        integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB"
        crossOrigin="anonymous"
      ></script>
      <script
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
        integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default Navbar;
