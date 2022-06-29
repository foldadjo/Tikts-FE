import React, { useEffect, useState } from "react";
// import axios from "../../utils/axios";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Pagination from "react-paginate";
import { useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataMovie } from "../../stores/action/movie";
import "./index.css";

export default function Viewall() {
  document.title = "View All Page|| Tickitz";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchDate, setReleaseDate] = useState("");
  console.log(searchDate);
  const month = [
    { number: "", title: "Get All" },
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
  const movie = useSelector((state) => state.movie);

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

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
      const resultmovie = await dispatch(getDataMovie(page, limit, searchDate, searchName, sort));
      console.log(resultmovie);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDetailMovie = (id) => {
    navigate(`/detail/${id}`);
  };

  const [sort, setSort] = useState(null);
  const [searchName, setSearchName] = useState("");

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  const handleSearchName = async (event) => {
    try {
      // event = JSON.parse(event);
      setSearchName(event.target.value);
      getdataMovie();
      console.log(event);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container bg-light">
      <h1>View All Page</h1>
      <hr />
      <Navbar />
      <section className="container" style={{ display: "flex" }}>
        <h3 className="text-bold font-weight-bold" style={{ flex: "1" }}>
          list movie
        </h3>
        <section className="d-flex flex-row-reverse" style={{ flex: "1" }}>
          <input
            className="rounded-4 border border-secondary mx-4 h-100 w-50 text-secondary px-3"
            type="text"
            placeholder="Search Movie Name"
            onChange={(event) => handleSearchName(event)}
          />
          <select
            className="sort mx-2 h-100 w-25 rounded border border-secondary text-secondary p-1"
            name="Sort"
            onClick={(event) => handleSort(event)}
          >
            <option value="">Sort</option>
            <option value="name ASC">A to Z</option>
            <option value="name DESC">Z to A</option>
          </select>
        </section>
      </section>
      <div className="month">
        {month.map((item) => (
          <button
            className={`month__text ${
              item.number === searchDate ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setReleaseDate(item.number)}
            key={item.number}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="bg-white">
        {movie.isLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <section className="card-block align-content-start container text-center">
            {movie.data.map((item) => (
              <object className="view_movie__image2 m-4" key={item.id}>
                <img
                  src={
                    item.image
                      ? `https://res.cloudinary.com/fazztrack/image/upload/v1650942515/${item.image}`
                      : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
                  }
                  alt="image"
                  className="view_movie__image--size"
                />
                <object>
                  <div className="font-weight-bold">{item.name}</div>
                  <div>{item.category}</div>
                  <div>
                    <button
                      className="btn btn-primary"
                      data={item}
                      onClick={() => handleDetailMovie(item.id)}
                    >
                      Details
                    </button>
                  </div>
                </object>
              </object>
            ))}
          </section>
        )}
      </div>
      <Pagination
        className="pagination justify-content-center mt-4 page-item"
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={movie.pageInfo.totalPage}
        onPageChange={handlePagination}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
      <Footer />
    </div>
  );
}
