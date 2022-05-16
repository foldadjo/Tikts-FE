import React from "react";
import { useEffect, useState } from "react";
// import axios from "../../utils/axios";
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import Pagination from "react-paginate";
import { useNavigate, createSearchParams, useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {getDataMovie, postMovie, updateMovie, deleteMovie} from "../../stores/action/movie"
import "./index.css"

export default function Managemovie() {
  document.title = "Manage Movie Page|| Tickitz";
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    name:"",
    category:"",
    director:"",
    cast:"",
    releaseDate:"",
    duration:"",
    synopsis:"",
    image: ""
  });
  const limit = 8;
  const movie = useSelector((state) => state.movie)

  const [idMovie, setIdMovie] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [image, setImage] = useState(null);

  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  useEffect(() => {
    getdataMovie();
  }, [page]);

  const handlePagination = (data) => {
    setPage(data.selected + 1);
  };
  useEffect(() => {
    getdataMovie();
  }, []);
  const getdataMovie = () => {
      // PanggilAction
      const resultmovie = dispatch(getDataMovie(page, limit, "", searchName, sort))
      console.log(resultmovie)
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

  const handleSubmit = async(e) => {
    try{
      e.preventDefault();
      console.log(form);
      const formData = new FormData();
      for (const data in form) {
        formData.append(data, form[data]);
      }
      await dispatch(postMovie(formData));
      getdataMovie();
      setImage(null);
      await resetForm();
    } catch (error) {
      console.log(error.response);
    }
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
    console.log(data)
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
      director: "",
      cast: "",
      releaseDate: null,
      duration: "",
      synopsis: "",
      image: ""
    });
  };
  const [sort, setSort] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSort = (event) => {
    setSort(event.target.value)
  }

  const handleSearchName = async (event) => {
    try {
      // event = JSON.parse(event);
      setSearchName(event.target.value);
      getdataMovie()
      console.log(event)
    }
    catch (error) {
      setIsError(true);
    }
  }

  useEffect(() => {
    getdataMovie();
    const params = {};
    if (searchName !== "") {
      params.searchName = searchName;
    }
    if (sort !== null) {
      params.sort = sort;
    } else ("")
    navigate({
      pathname: "/managemovie",
      search: `?${createSearchParams(params)}`
    });
  }, [searchName, sort]);


  return (
    <div className="container bg-light">
      <h1>Manage Movie Page</h1>
      <hr />
      <Navbar/>
      <form className="bg-white p-5 m-4" onSubmit={isUpdate? handleUpdate: handleSubmit}>
        <div className="row">
          <object className="col-3">
            <div className="card manage-image--size p-4 m-4">
              {isUpdate? ( !image ?
                  (<img src= {`https://res.cloudinary.com/fazztrack/image/upload/v1650942515/${form.image}`}/>)
                  :(image && <img src={image} alt="image movie preview" />)
              ): (!image?(
                  <img src="https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png" alt="image" />)
                  :
                  (image && <img src={image} alt="image movie preview" />)
              )}
            </div>
          </object>
          <object className="col-9">
            <div className="row">
              <object className="col">
                <div className="text-secondary">Movie Name</div>
                <input
                  className="text-secondary bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="text"
                  placeholder="Input Name ..."
                  name="name"
                  onChange={(event)=> handleChangeForm(event)}
                  value={form.name}
                />
              </object>
              <object className="col">
                <div className="text-secondary">Category</div>
                <input
                  className="text-secondary bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="text"
                  placeholder="Input Category ..."
                  name="category"
                  onChange={(event)=> handleChangeForm(event)}
                  value={form.category}
                />
              </object>
            </div>
            <div className="row">
              <object className="col">
                <div className="text-secondary">Director</div>
                <input
                  className="text-secondary bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="text"
                  placeholder="Input Director ..."
                  name="director"
                  onChange={(event)=> handleChangeForm(event)}
                  value={form.director}
                />
              </object>
              <object className="col">
                <div className="text-secondary">Casts</div>
                <input
                  className="text-secondary bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="text"
                  placeholder="Input Casts ..."
                  name="cast"
                  onChange={(event)=> handleChangeForm(event)}
                  value={form.cast}
                />
              </object>
            </div>
            <div className="row">
              <object className="col">
                <div className="text-secondary">Release Date</div>
                <input
                  className="text-secondary bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="date"
                  placeholder="Input Release Date ..."
                  name="releaseDate"
                  onChange={(event)=> handleChangeForm(event)}
                />
              </object>
              <object className="col">
                <div className="text-secondary">Duration</div>
                <input
                  className="text-secondary bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="text"
                  placeholder="Input Duration ..."
                  name="duration"
                  onChange={(event)=> handleChangeForm(event)}
                  value={form.duration}
                />
              </object>
            </div>
            <br />       
            <input
              type="file"
              name="image"
              onChange={(event)=> handleChangeForm(event)}
            />
            <br />
          </object>
        </div>
        <object className="col">
          <div className="text-secondary mx-4">Synopsis</div>
          <input
            className="text-secondary bg-light p-3 rounded border border-secondary w-100 text-synopsis"
            type="text"
            placeholder="Input Synopsis ..."
            name="synopsis"
            onChange={(event)=> handleChangeForm(event)}
            value={form.synopsis}
          />
        </object>
        <br />
        <div className="d-flex flex-row-reverse m-4">
          <button className="btn btn-primary mx-4 mt-4 w-25" type="submit">{isUpdate? "Update" : "Submit"}</button>
          <button className="btn btn-light border border-primary text-primary mx-4 mt-4 w-25" type="reset" onClick={() => resetForm()}>reset</button>  
        </div>
      </form>
      <section className="container" style={{display:"flex"}}>
        <h3 className="text-bold font-weight-bold" style={{flex: "1"}}>Data movie</h3>
        <section className="d-flex flex-row-reverse" style={{flex: "1"}}>
          <input
            className="rounded-4 border border-secondary mx-4 h-100 w-50 text-secondary px-3"
            type="text"
            placeholder="Search Movie Name"
            onChange={(event)=> handleSearchName(event)}
          />
          <select className="sort mx-2 h-100 w-25 rounded border border-secondary text-secondary p-1" name="Sort" onClick={(event) => handleSort(event)}>
            <option value="">Sort</option>
            <option value ="name ASC">A to Z</option>
            <option value ="name DESC">Z to A</option>
          </select>
        </section>
      </section>
      <div className="container">
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
                            : "https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png"
                        }
                        alt="image"
                        className="view_movie__image--size"
                      />
                      <object>
                        <div className="font-weight-bold">{item.name}</div>
                        <div>{item.category}</div>
                        <div>
                          <button className="btn btn-secondary m-2" onClick={() => setUpdate(item)}>
                            Update
                          </button>
                        <div>
                          <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                            Delete
                          </button>
                        </div>
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
      <Footer/>
    </div>
  );
}
