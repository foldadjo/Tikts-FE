import React, { useState, useEffect } from 'react'
import {useNavigate, useLocation, Navigate} from "react-router-dom";
import axios from '../../utils/axios';

function Bookingstatus() {
    const Navigate = useNavigate()
    const { state } = useLocation();
    const [dataSchedule, setDataSchedule] = useState([])
    const handleHomepage = () => {
        Navigate("/")
    }

    useEffect(() => {
        handleListSchedule();
      }, []);

    const handleListSchedule = async () => {
        try {
          const resultSchedule = await axios.get(`schedule/${state.scheduleId}`);
          setDataSchedule(resultSchedule.data.data);
        } catch (error) {
          setIsError(true);
          setMessage(error.response.data.msg);
        }
      };
    
  return (
    <div style={{margin: "30px 50px"}}>
        <br />
        <img style={{width:"300px"}} src={require("../../assets/Tickitz 2.png")} alt="" />
        <br />
        <h1>
            Movie : {dataSchedule.map((item)=>(item.name))}
        </h1>
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
        <h1>
            Jam Tayang : {state.timeBooking}
        </h1>
        <h1>
            Lokasi : {dataSchedule.map((item)=>(item.location))}
        </h1>
        <h1>
            Premiere : {dataSchedule.map((item)=>(item.premiere))}
        </h1>
            
        <br />
        <button onClick={handleHomepage}>Home Page</button>
    </div>
  )
}

export default Bookingstatus
