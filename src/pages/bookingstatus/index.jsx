import React, { useState, useEffect } from 'react'
import { useLocation} from "react-router-dom";

function Bookingstatus() {
    const { state } = useLocation();
    console.log(state)
  return (
    <div>
        <h1>
            Booking Id : {state.result.bookingId}
        </h1>
        <h1>
            User Id : {state.result.userId}
        </h1>
        <h1>
            Total Ticket : {state.result.totalTicket}
        </h1>
        <h1>
            Tanggal Tayang : {state.result.dateBooking}
        </h1>
        <h1>
            Jam Tayang : {state.result.timeBooking}
        </h1>
    </div>
  )
}

export default Bookingstatus
