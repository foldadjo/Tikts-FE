import React from "react";
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import "./index.css"

export default function Dashboard() {
  document.title = "Dashboard|| Tickitz";

  return (
    <div className="text-center container">
      <Navbar/>
      <Footer/>
    </div>
  );
}