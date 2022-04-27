import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import "./index.css"
import axios from "../../utils/axios";

export default function Payment() {
  document.title = "Tickitz | Payment";
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ data, setData] = useState([])
  const [dataOrder, setDataOrder] = useState(state);
  const [dataBooking, setDataBooking] = useState()

  useEffect(() => {
    handleBookingData();
  }, []);

  const handleBookingData = async () => {
    try {
      const resultSchedule = await axios.get(`schedule/${state.scheduleId}`);
      setData(resultSchedule.data.data);
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  const handlePayment = (method) => {
    const paymentMethod = method
    setDataOrder({ ...dataOrder, paymentMethod});
  }

  useEffect(() => {
    handleBookingPost();
  }, []);

  const handleBookingPost = async () => {
    try {
      const resultSchedule = await axios.post("booking", dataOrder);
      setDataBooking(resultSchedule.data.data);
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  const handleBack = () => {
    navigate("/order")
  }

  const handleCard = () => {
    console.log(dataBooking)
    navigate("/bookingstatus", {state: dataBooking})
  }

  return (
    <div className="text-center container">
      <Navbar/>
      <h1>Payment Page</h1>
      <hr />
      <div className="row">
          <div className="body__header col-md-8">
            <h2>Payment Info</h2>
            <div className="body__content">
                <div>
                    <div style={{display: "flex"}} className="info__detail">
                    <object style={{flex: "1"}} className="info__detail--title">
                        Date & time
                    </object>
                    <object className="info__detail--value">
                        {state.dateBooking} & {state.timeBooking}
                    </object>
                    </div>
                    <hr className="dropdown-divider" />
                    <div style={{display: "flex"}} className="info__detail">
                    <object style={{flex: "1"}} className="info__detail--title">
                        Movie title
                    </object>
                    <object className="info__detail--value">
                        {data.map((item)=>(item.name))}
                    </object>
                    </div>
                    <hr className="dropdown-divider" />
                    <div style={{display: "flex"}} className="info__detail">
                    <object style={{flex: "1"}} className="info__detail--title">
                        Cinema name
                    </object>
                    <object className="info__detail--value">{data.map((item)=>(item.premiere))}</object>
                    </div>
                    <hr className="dropdown-divider" />
                    <div style={{display: "flex"}} className="info__detail">
                    <object style={{flex: "1"}} className="info__detail--title">
                        Number of tickets
                    </object>
                    <object className="info__detail--value">{state.seat.length} pieces</object>
                    </div>
                </div>
                <hr className="dropdown-divider" />
                <div style={{display: "flex"}} className="info__detail">
                    <object style={{flex: "1"}} className="info__detail--title">
                    Total Payment
                    </object>
                    <object className="info__detail--value2">Rp. {state.totalPayment}</object>
                </div>
                </div>
                <h2>Choose a Payment Method</h2>
                <div className="body__content">
                <div className="payment" style={{display: "flex"}}>
                    <button onClick={() => handlePayment("Google Pay")} className="payment__border" style={{flex: "3"}}>
                    <img src={require("../../assets/logo gpay.png")} alt="" />
                    </button>
                    <button onClick={() => handlePayment("Visa")} className="payment__border" style={{flex: "3"}}>
                    <img src={require("../../assets/Logo visa.png")} alt="" />
                    </button>
                    <button onClick={() => handlePayment("Gopay")} className="payment__border" style={{flex: "3"}}>
                    <img src={require("../../assets/Logo GoPay.png")} alt="" />
                    </button>
                    <button onClick={() => handlePayment("Paypal")} className="payment__border" style={{flex: "3"}}>
                    <img src={require("../../assets/logo paypal.png")} alt="" />
                    </button>
                </div>
                <div className="payment" style={{display: "flex"}}>
                    <button onClick={() => handlePayment("Dana")} className="payment__border" style={{flex: "3"}}>
                    <img src={require("../../assets/logo dana.png")} alt="" />
                    </button>
                    <button onClick={() => handlePayment("BCA")} className="payment__border" style={{flex: "3"}}>
                    <img src={require("../../assets/logo BCA.png")} alt="" />
                    </button>
                    <button onClick={() => handlePayment("BRI")} className="payment__border" style={{flex: "3"}}>
                    <img src={require("../../assets/logo BRI.png")} alt="" />
                    </button>
                    <button onClick={() => handlePayment("OVO")} className="payment__border" style={{flex: "3"}}>
                    <img src={require("../../assets/logo ovo.png")} alt="" />
                    </button>
                </div>
                <div style={{display: "flex" , color: "#a0a3bd"}}>
                    <object style={{flex: "2"}}>
                    <hr className="dropdown-divider" />
                    </object>
                    <object style={{flex: "1", text_align: "center"}}>or</object>
                    <object style={{flex: "2"}}>
                    <hr className="dropdown-divider" />
                    </object>
                </div>
                <div style={{text_align: "center"}}>
                    <object className="payment__other1">Pay via cast </object>
                    <object className="payment__other2">See how it work</object>
                </div>
                </div>
          </div>
          <div className="body__header col-md-4">
            <h2>Personal Info</h2>
                <div className="body__content">
                <div className="profile">
                    <div className="profile__title">Full name</div>
                    <input type="text" placeholder="Jonas El Rodriguez" />
                </div>
                <div className="profile">
                    <div className="profile__title">Email</div>
                    <input type="email" placeholder="jonasrodri123@gmail.com" />
                </div>
                <div className="profile">
                    <div className="profile__title">Number</div>
                    <input type="tel" placeholder="81445687121" />
                </div>
                <div className="warning">
                    <img src={require("../../assets/warning.png")} alt="warning" style={{opacity: "100%"}} />
                    <object>Fill you data correctly</object>
                </div>
                </div>
          </div>
          <div className="col-md-8 button">
            <button pnClick={handleBack} className="button1">Change your movie</button>
            <button onClick={() => handleCard()} className="button2">Checkout now</button>
          </div>
      <Footer/>
      </div>
    </div>
  );
}
