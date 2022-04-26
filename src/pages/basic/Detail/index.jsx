import React, { useState } from "react";
import { useSearchParams, useLocation, useParams, useNavigate } from "react-router-dom";

export default function Detail() {
  const navigate = useNavigate();
  // [1]
  //   const [searchParams] = useSearchParams();
  //   const params = Object.fromEntries([...searchParams]);
  //   console.log(params.id);
  // [2]
  //   const { state } = useLocation();
  //   console.log(state.id);
  // [3]
  const params = useParams();
  console.log(params.id);

  const [dataOrder, setDataOrder] = useState({
    movieId: params.id,
    dateBooking: new Date().toISOString().split("T")[0]
  });

  const listSchedule = [
    {
      id: 1,
      premiere: "Ebu.id",
      price: "50000",
      movieName: "Spiderman",
      time: ["10:00", "12:00"]
    },
    {
      id: 2,
      premiere: "CineOne",
      price: "60000",
      movieName: "Batman",
      time: ["13:00", "15:00"]
    }
  ];

  console.log(dataOrder);

  // GET DATA MOVIE BY ID
  // GET DATA SCHEDULE FILER BY MOVIE ID & DATE BOOKING

  const changeDataBooking = (data) => {
    setDataOrder({ ...dataOrder, ...data });
  };

  const handleBooking = () => {
    // [1] = localstorage
    // [2] = lempar data dengan state
    navigate("/basic/order", { state: dataOrder });
  };

  return (
    <div className="text-center container">
      <h1>Detail Page</h1>
      <hr />
      <h6>Detail Movie</h6>
      <hr />
      <h3>List Schedule</h3>
      <input type="date" value={dataOrder.dateBooking} />
      <select name="location">
        <option value="">Select Location</option>
        <option value="jakarta">Jakarta</option>
      </select>
      <hr />
      <div className="row">
        {listSchedule.map((item) => (
          <div className="col-md-4" key={item.id}>
            <h4>{item.premiere}</h4>
            <hr />
            {item.time.map((itemTime) => (
              <button
                key={itemTime}
                onClick={() => changeDataBooking({ timeBooking: itemTime, scheduleId: item.id })}
              >
                {itemTime}
              </button>
            ))}
            <br />
            <br />
            <button
              disabled={item.id === dataOrder.scheduleId ? false : true}
              onClick={handleBooking}
            >
              Booking
            </button>
          </div>
        ))}
      </div>
      <hr />
      <h5>Detail Order Data</h5>
      <h6>{JSON.stringify(dataOrder)}</h6>
    </div>
  );
}