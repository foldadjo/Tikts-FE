import { useEffect, useState } from "react";
import axios from "../../utils/axios";
// import Pagination from "react-paginate";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import "./index.css"

function Home() {
  document.title = "Tickitz | Home";
  const navigate = useNavigate();
  const limit = 10;
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
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [releaseDate, setReleaseDate] = useState(4);
  const [pageInfo, setPageInfo] = useState({});
  const dataUser = localStorage.getItem("dataUser");
  const newData = 1;

  useEffect(() => {
    getdataMovie();
  }, []);

  useEffect(() => {
    getdataMovie();
  }, [page]);

  const getdataMovie = async () => {
    try {
      const resultMovie = await axios.get(`movie?page=${page}&limit=${limit}`);
      setData(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDetailMovie = (id) => {
    navigate(`/detail/${id}`);
    console.log(id);
  };

  const handleViewAll = () => {
    navigate("/viewall")
  }

  return (
    <div className="text-center container">
      <h1>Home Page</h1>
      <hr />
      <Navbar/>
      <section className="home__banner">
        <img
            src={require("../../assets/banner1.png")}
            alt="banner1"
            className="home_banner1__size"
            style={{width: "300px"}}
        />
        <img
            src={require("../../assets/banner2.png")}
            alt="banner2"
            className="home_banner2__size"
            style={{width: "300px"}}
        />
      </section>
      <article className="home_article">
        <div className="article__caption1">
          <u>Now Showing </u>
        </div>
        <div className="article__caption2" onClick={handleViewAll}>view all</div>
      </article>
      {/* .........Card Now Showing....... */}
      <section className="movie" >
        {data.map((item)=>(
          <object className="dropdown" key={item.id}>
            <div className="dropbtn">
              <img
                src={
                  item.image
                    ? `https://res.cloudinary.com/fazztrack/image/upload/v1650942515/${item.image}`
                    : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
                }
                className="movie__image--size"
                alt="image"
              />
            </div>
            <div className="dropdown-content">
              <div className="dropdown-content--title">{item.name}</div>
              <div className="dropdown-content--category" style={{color: "#a0a3bd"}}
                >{item.category}</div>
              <div href="detail.html"
                ><button className="dropdown-content--button" data={item} onClick={() => handleDetailMovie(item.id)}>Detail</button></div>
            </div>
          </object>
        ))}     
      </section>
      <article className="home_article">
        <div className="article__caption1">Up Cooming</div>
        <div className="article__caption2" onClick={handleViewAll}>view all</div>
      </article>
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
      <section className="movie" style={{display: "flex"}}>
        {data.map((item)=>(
          <object className="movie__image2" style={{flex: "1"}} key={item.id}>
              <img
                src={
                  item.image
                    ? `https://res.cloudinary.com/fazztrack/image/upload/v1650942515/${item.image}`
                    : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
                }
                className="movie__image--size"
                alt="image"
              />
            <object className="title">{item.name}</object>
            <object className="category">{item.category}</object>
            <button className="button__detail" data={item} onClick={() => handleDetailMovie(item.id)}>Details</button>
          </object>
        ))}
      </section>
      <Footer/>
    </div>
  );
}

export default Home;