import React, { useState, useEffect } from "react";
import { useSearchParams, useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import "./index.css"

export default function Detail() {
  document.title = "Tickitz | Detail";
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [dataSchedule, setDataSchedule] = useState([]);
  const [dataOrder, setDataOrder] = useState({
    movieId: params.id,
    dateBooking: new Date().toISOString().split("T")[0]
  });

  useEffect(() => {
    handleListMovie();
  }, []);

  useEffect(() => {
    handleListSchedule();
  }, []);

  const handleListMovie = async () => {
    try {
      const resultMovie = await axios.get(`movie/${params.id}`);
      setData(resultMovie.data.data);
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  const handleListSchedule = async () => {
    try {
      const resultSchedule = await axios.get(`/schedule?searchMovieId=${params.id}`);
      setDataSchedule(resultSchedule.data.data);
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };
  console.log(dataOrder);
  console.log(dataSchedule);
  // GET DATA MOVIE BY ID
  // GET DATA SCHEDULE FILER BY MOVIE ID & DATE BOOKING

  const changeDataBooking = (data) => {
    setDataOrder({ ...dataOrder, ...data });
  };

  const handleBooking = () => {
    navigate("/order", { state: dataOrder });
  };

  return (
    <div className="text-center container">
      <Navbar/>
      <h1>Detail Page</h1>
      <hr />
      <section className="banner" >
        <object className="banner__image" >
          <img
            src={
              (data.map((item)=>(item.image)))[0]
                ? `https://res.cloudinary.com/fazztrack/image/upload/v1650942515/${(data.map((item)=>(item.image)))[0]}`
                : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
              }
            className="banner__image-image"
          />
        </object>
        <object className="banner__detail" >
          <h1>{(data.map((item)=>(item.name)))[0]}</h1>
          <div className="banner__detail--category">{(data.map((item)=>(item.category)))[0]}</div>
          <div className="banner__detail--spesific">
            <object className="detail__kiri">
              <div className="detail__spesific--title">release date</div>
              <div className="detail__spesific--content">{(data.map((item)=>(item.releaseDate)))[0]}</div>
              <div className="detail__spesific--title">Duration</div>
              <div className="detail__spesific--content">{(data.map((item)=>(item.duration)))[0]}</div>
            </object>
            <object className="detail__kanan">
              <div className="detail__spesific--title">Directed by</div>
              <div className="detail__spesific--content">{(data.map((item)=>(item.director)))[0]}</div>
              <div className="detail__spesific--title">Casts</div>
              <div className="detail__spesific--content">
                {(data.map((item)=>(item.cast)))[0]}
              </div>
            </object>
          </div>
        </object>
      </section>
      <hr />
      <section className="sometimes">
        <div className="sometimes__header">Showtimes and Ticket</div>
        <section className="sometimes__button" style={{display: "flex"}}>
          <input
            type="date"
            placeholder="Set a Date"
            value={dataOrder.dateBooking}
            className="sometimes__button1"
            style={{flex: "1"}}
          />
          <select name="location" className="sometimes__button2" style={{flex: "1"}}>
            <option value="">Select Location</option>
            <option value="jakarta">Jakarta</option>
            <option value="bogor">Bogor</option>
            <option value="tangerang">Tangerang</option>
          </select>
        </section>
        <section className="premier">
          {dataSchedule.map((item)=>(
            <object className="premier__box" key={item.id}>
              <div className="box__header">
                <object style={{flex: "1"}}>
                  <img
                    src={item.premiere==="Ebu.Id"?require("../../assets/logo ebv.png")
                    :item.premiere==="hiflix"?require("../../assets/logo hiflix.png")
                    :item.premiere==="cinemaOne"?require("../../assets/logo cineone.png")
                    :require("../../assets/Tickitz 2.png")}
                    alt="logo"
                    className="box__image"
                  />
                </object>
                <object style={{flex: "1"}} className="box__detail">
                  <h1>{item.premiere}</h1>
                  <div>{item.location}</div>
                </object>
              </div>
              <hr />
              {item.time.split(",").map((itemTime)=>(
                <button 
                key={itemTime} 
                onClick={() => changeDataBooking({ timeBooking: itemTime, scheduleId: item.id })} 
                className="box__time"
                >
                  {itemTime}
                </button>
              ))}
              <br />
              <br />
              <button
              disabled={item.id === dataOrder.scheduleId ? false : true}
              className="box__button"
              onClick={handleBooking}
            >
              Booking
            </button>
            </object>
          ))}
        </section>
      </section>
      <hr />
      {/* <h5>Detail Order Data</h5>
      <h6>{JSON.stringify(dataOrder)}</h6> */}
      <Footer/>
    </div>
  );
}