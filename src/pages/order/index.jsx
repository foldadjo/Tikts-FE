import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Seat from "../../components/Seat";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import "./index.css";
import axios from "../../utils/axios";

export default function Order() {
  document.title = "Tickitz | Order";
  const navigate = useNavigate();
  const { state } = useLocation();
  const [data, setData] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState([]);
  const [dataOrder, setDataOrder] = useState(state);

  //   PROSES GET SEAT
  const listSeat = ["A", "B", "C", "D", "E", "F", "G"];
  const handleSelectSeat = (seat) => {
    console.log(seat);
    if (selectedSeat.includes(seat)) {
      const deleteSeat = selectedSeat.filter((el) => {
        return el !== seat;
      });
      setSelectedSeat(deleteSeat);
    } else {
      setSelectedSeat([...selectedSeat, seat]);
    }
  };
  console.log(selectedSeat);

  useEffect(() => {
    handleBookingData();
  }, []);

  const handleBookingData = async () => {
    try {
      const resultSchedule = await axios.get(`schedule/${state.scheduleId}`);
      setData(resultSchedule.data.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    handleSeatBookingData();
  }, []);

  const handleSeatBookingData = async () => {
    try {
      const resultBooking = await axios.get(
        `booking/seat?dateBooking=${state.dateBooking}&timeBooking=${state.timeBooking}&scheduleId=${state.scheduleId}`
      );
      setReservedSeat(resultBooking.data.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleBooking = () => {
    const setDataBooking = {
      ...dataOrder,
      seat: selectedSeat.join(),
      totalPayment: selectedSeat.length * data[0].price
    };
    console.log(setDataBooking);
    navigate("/payment", { state: setDataBooking });
    console.log(state);
    console.log(selectedSeat);
    console.log(dataOrder);
    console.log(data[0].price);
  };

  const handleMovie = () => {
    navigate("/");
  };

  return (
    <div className="text-center container">
      <Navbar />
      <h1>Order Page</h1>
      <hr />
      <div className="row">
        <div className="col-md-8">
          <div className="body__header">
            <h2>Movie Selected</h2>
            <div className="body__content" style={{ display: "flex" }}>
              <div className="body__content--title" style={{ flex: "1" }}>
                {data.map((item) => item.name)}
              </div>
              <button onClick={handleMovie} className="body__content--button">
                Change movie
              </button>
            </div>
            <h2>Choose Your Seat</h2>
            <div className="body__content">
              <div className="card">
                <div className="card-body">
                  <br />
                  <h5>screen</h5>
                  <hr />
                  <br />
                  {listSeat.map((item) => (
                    <div key={item}>
                      <Seat
                        rowSeat={item}
                        selectedSeat={handleSelectSeat}
                        reserved={reservedSeat}
                        selected={selectedSeat}
                      />
                    </div>
                  ))}
                  <div className="row seat__row">
                    <div className="col seat__col" style={{ margin: "0 -8px 0 0" }}></div>
                    <div className="col seat__col">1</div>
                    <div className="col seat__col">2</div>
                    <div className="col seat__col">3</div>
                    <div className="col seat__col">4</div>
                    <div className="col seat__col">5</div>
                    <div className="col seat__col">6</div>
                    <div className="col seat__col">7</div>
                    <div className="col seat__col"></div>
                    <div className="col seat__col">8</div>
                    <div className="col seat__col">9</div>
                    <div className="col seat__col">10</div>
                    <div className="col seat__col">11</div>
                    <div className="col seat__col">12</div>
                    <div className="col seat__col">13</div>
                    <div className="col seat__col" style={{ margin: "0 8px 0 0" }}>
                      14
                    </div>
                  </div>
                  <br />
                  <h4>Seating key</h4>
                  <div className="box" style={{ display: "flex" }}>
                    <object className="box1" style={{ flex: 1 }}></object>
                    <object className="box__title" style={{ flex: 5 }}>
                      Available
                    </object>
                    <object className="box2" style={{ flex: 1 }}></object>
                    <object className="box__title" style={{ flex: 5 }}>
                      Selected
                    </object>
                    <object className="box3" style={{ flex: 1 }}></object>
                    <object className="box__title" style={{ flex: 5 }}>
                      Sold
                    </object>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="body__header">
            <h2>Order Info</h2>
            <div className="body__content">
              <div className="info__header">
                <img
                  src={
                    data.map((item) => item.premiere)[0] === "Ebu.Id"
                      ? require("../../assets/logo ebv.png")
                      : data.map((item) => item.premiere)[0] === "hiflix"
                      ? require("../../assets/logo hiflix.png")
                      : data.map((item) => item.premiere)[0] === "cinemaOne"
                      ? require("../../assets/logo cineone.png")
                      : require("../../assets/Tickitz 2.png")
                  }
                  alt="logo"
                />
                <h3>{data.map((item) => item.premiere)}</h3>
              </div>
              <hr />
              <div>
                <div style={{ display: "flex" }} className="info__detail">
                  <object style={{ flex: "1" }} className="info__detail--title">
                    Movie selected
                  </object>
                  <object className="info__detail--value">
                    {data.map((item) => item.name)[0]}
                  </object>
                </div>
                <div style={{ display: "flex" }} className="info__detail">
                  <object style={{ flex: "1" }} className="info__detail--title">
                    Tuesday, 07 July 2020
                  </object>
                  <object className="info__detail--value">{state.timeBooking}</object>
                </div>
                <div style={{ display: "flex" }} className="info__detail">
                  <object style={{ flex: "1" }} className="info__detail--title">
                    One ticket price
                  </object>
                  <object className="info__detail--value">
                    Rp. {data.map((item) => item.price)[0]}
                  </object>
                </div>
                <div style={{ display: "flex" }} className="info__detail">
                  <object style={{ flex: "1" }} className="info__detail--title">
                    Seat choosed
                  </object>
                  <object className="info__detail--value">{selectedSeat + ""} </object>
                </div>
                <hr />
                <div style={{ display: "flex" }} className="info__detail">
                  <object style={{ flex: "1" }} className="info__detail--title">
                    Total Price
                  </object>
                  <object className="info__detail--value">
                    {selectedSeat.length * data[0]?.price}{" "}
                  </object>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 button">
          <button className="button1" onClick={handleMovie}>
            Change your movie
          </button>
          <button className="button2" onClick={handleBooking}>
            Checkout now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
