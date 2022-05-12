import React from "react";
import { useEffect, useState } from "react";
// import axios from "../../utils/axios";
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import Pagination from "react-paginate";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {getDataMovie, postMovie, updateMovie, deleteMovie} from "../../stores/action/movie"
import "./index.css"

export default function Managemovie() {
  document.title = "Manage Movie Page|| Tickitz";
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [searchmovie, setSearchmovie] = useState("");
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    name:"",
    category:"",
    director:"",
    cast:"",
    releaseDate:"",
    duration:"",
    synopsis:"",
    image: null
  });
  const limit = 8;
  const movie = useSelector((state) => state.movie)

  const [idMovie, setIdMovie] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [image, setImage] = useState(null);

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

  const handleChangeForm = (event) => {
    const {name, value, files} = event.target;
    if (name === "image") {
      setForm({...form, [name]: files[0] });
      setImage(URL.createObjectURL(files[0]));
      console.log(image)
    } else {
      setForm({...form, [name]: value });
    }
  }

  const handleDetailMovie = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    dispatch(postMovie(formData));
    getdataMovie();
    setImage(null);
    resetForm();
  };

  const setUpdate = (data) => {
    const { id, name, category, director, cast, releaseDate, duration, synopsis, image } = data;
    setForm({
      ...form,
      name,
      category,
      director,
      cast,
      releaseDate,
      duration,
      synopsis,
      image
    });
    setIdMovie(id);
    setIsUpdate(true);
  };

  const handleUpdate = async (e) => {
    try {
      // PanggilAction
      e.preventDefault();
      console.log(form);
      console.log(idMovie);
      const formData = new FormData();
      for (const data in form) {
        formData.append(data, form[data]);
      }
      const resultupdate =await dispatch(updateMovie(idMovie, formData));
      getdataMovie();
      console.log(resultupdate);
      setIsUpdate(false);
      setImage(null);
      await resetForm();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
    getdataMovie();
  }

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      synopsis: "",
      image: null
    });
  };


  return (
    <div className="container">
      <h1>Manage Movie Page</h1>
      <hr />
      <Navbar/>
      <form onSubmit={isUpdate? handleUpdate: handleSubmit}>
        <input
          type="text"
          placeholder="Input Name ..."
          name="name"
          onChange={(event)=> handleChangeForm(event)}
          value={form.name}
        />
        <br />
        <input
          type="text"
          placeholder="Input Category ..."
          name="category"
          onChange={(event)=> handleChangeForm(event)}
          value={form.category}
        />
        <br />
        <input
          type="text"
          placeholder="Input Synopsis ..."
          name="synopsis"
          onChange={(event)=> handleChangeForm(event)}
          value={form.synopsis}
        />
        <br />
        <input
          type="file"
          name="image"
          onChange={(event)=> handleChangeForm(event)}
        />
        {image && <img src={image} alt="image movie preview" />}
        <br />
        <button type="submit">{isUpdate? "Update" : "Submit"}</button>
      </form>
      <section className="container" style={{display:"flex"}}>
        <h3 className="text-right" style={{flex: "1"}}>Data movie</h3>
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
                    <button onClick={() => handleDetailMovie(item.id)}>Detail</button>
                    <button className="btn btn-secondary" onClick={() => setUpdate(item)}>
                      Update
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
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
