import React from "react";
import { useEffect, useState } from "react";
// import axios from "../../utils/axios";
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import Pagination from "react-paginate";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {getDataMovie} from "../../stores/action/movie"
import "./index.css"

export default function Viewall() {
  document.title = "View All Page|| Tickitz";
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [searchmovie, setSearchmovie] = useState("");
  const [page, setPage] = useState(1);
  const [releaseDate, setReleaseDate] = useState(5);
  const month = [
    { number: 1, title: "Januari" },
    { number: 2, title: "Februari" },
    { number: 3, title: "Maret" },
    { number: 4, title: "April" },
    { number: 5, title: "Mei" },
    { number: 6, title: "Juni" },
    { number: 7, title: "Juli" },
    { number: 8, title: "Agustus" },
    { number: 9, title: "September" },
    { number: 10, title: "Oktober" },
    { number: 11, title: "November" },
    { number: 12, title: "Desember" }
  ];
  const limit = 8;
  const movie = useSelector((state) => state.movie)
  console.log("movie is", movie)

  // const [form, setForm] = useState({
  //   name:"",
  //   category:"",
  //   synopsis:"",
  //   image: null
  // });
  // const [idMovie, setIdMovie] = useState("");
  // const [isUpdate, setIsUpdate] = useState(false);
  // const [image, setImage] = useState(null);

  useEffect(() => {
    getdataMovie();
  }, [page]);

  const handlePagination = (data) => {
    setPage(data.selected + 1);
  };
  useEffect(() => {
    getdataMovie();
  }, []);
  const getdataMovie = async () => {
    try {
      // PanggilAction
      const resultmovie =await dispatch(getDataMovie(page, limit))
      console.log(resultmovie)
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDetailMovie = (id) => {
    navigate(`/detail/${id}`);
  };


  return (
    <div className="container">
      <h1>View All Page</h1>
      <hr />
      <Navbar/>
      <section className="container" style={{display:"flex"}}>
        <h3 className="text-right" style={{flex: "1"}}>list movie</h3>
        <section style={{flex: "1"}}>
          <select name="Sort">
            <option value="">Sort</option>
            <option value="jakarta">A to Z</option>
            <option value="bogor">Z to A</option>
          </select>
          <input
            type="text"
            placeholder="Search Movie Name"
            onChange={()=> setSearchmovie}
          />
        </section>
      </section>
      <div className="month">
        {month.map((item) => (
            <button
              className={`month__text ${
                item.number === releaseDate ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setReleaseDate(item.number)}
              key={item.number}
            >
              {item.title}
            </button>
          ))}
      </div>
      <div className="container">
        {movie.isLoading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
              <section className="card-body text-center">
                {movie.data.map((item) => (
                  <object className="movie__image2 col-xs-8 col-sm-6 col-md-4" key={item.id}>
                      <img
                        src={
                          item.image
                            ? `https://res.cloudinary.com/fazztrack/image/upload/v1650942515/${item.image}`
                            : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
                        }
                        alt="image"
                        className="movie__image--size"
                      />
                    <object >{item.name}</object>
                    <object >{item.category}</object>
                    <button data={item} onClick={() => handleDetailMovie(item.id)}>Details</button>
                  </object>
                ))}
              </section>
          )}
      </div>
      <Pagination
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={movie.pageInfo.totalPage}
        onPageChange={handlePagination}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
      <Footer/>
    </div>
  );
}
