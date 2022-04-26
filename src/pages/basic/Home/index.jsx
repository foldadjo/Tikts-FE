import { useEffect, useState } from "react";
import Card from "../../../components/basic/Card";
import axios from "../../../utils/axios";
import Pagination from "react-paginate";
import { useNavigate } from "react-router-dom";

function Home() {
  document.title = "Tickitz | Home";
  const navigate = useNavigate();
  const limit = 6;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    getdataMovie();
  }, []);

  useEffect(() => {
    getdataMovie();
  }, [page]);

  const getdataMovie = async () => {
    try {
      console.log("GET DATA MOVIE");
      // Input
      //   console.log(limit);
      //   console.log(page);
      // Proses
      const resultMovie = await axios.get(`movie?page=${page}&limit=${limit}`);
      //   console.log(resultMovie);
      // Output
      setData(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleDetailMovie = (id) => {
    // [1] = search params untuk pagination
    // navigate(`/basic/detail?id=${id}`);
    // [2] = state
    // navigate("/basic/detail", { state: { id: id } });
    // [3]
    navigate(`/basic/detail/${id}`);
    console.log(id);
  };

  const handlePagination = (data) => {
    setPage(data.selected + 1);
  };

  return (
    <div className="text-center container">
      <h1>Home Page</h1>
      <hr />
      <div className="row">
        {data.map((item) => (
          <div className="col-md-4" key={item.id}>
            <Card data={item} handleDetail={handleDetailMovie} />
          </div>
        ))}
      </div>
      <Pagination
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageInfo.totalPage}
        onPageChange={handlePagination}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default Home;