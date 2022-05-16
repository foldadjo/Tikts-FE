import axios from "../../utils/axios";

export const getDataMovie = (page, limit, releaseDate, searchName, sort) => {
  return {
    type: "GET_DATA_MOVIE",
    payload: axios.get(
      `movie?page=${page}&searchRelease=${releaseDate}&limit=${limit}&searchName=${searchName}&sort=${sort}`
    )
  };
};

export const postMovie = (form) => {
  return {
    type: "POST_DATA_MOVIE",
    payload: axios.post(`movie`, form)
  };
};

export const updateMovie = (id, form) => {
  return {
    type: "UPDATE_DATA_MOVIE",
    payload: axios.patch(`movie/${id}`, form)
  };
};

export const deleteMovie = (id) => {
  return {
    type: "DELETE_DATA_MOVIE",
    payload: axios.delete(`movie/${id}`)
  };
};
