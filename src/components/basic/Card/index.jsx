import React from "react";

function Card(props) {
  const { id, name, category } = props.data;
  const image = "vxyfddgxlx5fr8ma2wxm.png";

  return (
    <div className="card">
      <img
        src={
          image
            ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1648786582/Tickitz/movie/${image}`
            : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
        }
        className="card-img-top"
        alt="..."
      />
      <span>img : {image}</span>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{category}</p>
        <button className="btn btn-primary" onClick={() => props.handleDetail(id)}>
          Detail
        </button>
        <button className="btn btn-secondary" onClick={() => props.setUpdate(props.data)}>
          Update
        </button>
        <button className="btn btn-danger" onClick={() => props.handleDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

Card.defaultProps = {
  category: "Default Category"
};

export default Card;