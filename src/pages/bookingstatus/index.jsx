import React, { useState, useEffect } from 'react'
import {useNavigate, useLocation, Navigate} from "react-router-dom";

function Bookingstatus() {
    const Navigate = useNavigate()
    const { state } = useLocation();
    const handleHomepage = () => {
        Navigate("/")
    }
    
  return (
    <div>
        <h1>
            Booking Id : {state.bookingId}
        </h1>
        <h1>
            User Id : {state.userId}
        </h1>
        <h1>
            Total Ticket : {state.totalTicket}
        </h1>
        <h1>
            Tanggal Tayang : {state.dateBooking}
        </h1>
        <h1>
            Jam Tayang : {state.timeBooking}
        </h1>
        <br />
        <br />
        <button onClick={handleHomepage}>Home Page</button>
    </div>
  )
}

export default Bookingstatus
