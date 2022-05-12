import React from "react";
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import "./index.css"

export default function Profile() {
  document.title = "Profiles|| Tickitz";

  return (
    <div className="text-center container">
      <Navbar/>
      <Footer/>
    </div>
  );
}