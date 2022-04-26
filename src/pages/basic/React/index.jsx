import React, { useState } from "react";
import "./index.css";
import styles from "./React.module.css";
import Navbar from "../../../components/basic/Navbar";
import Card from "../../../components/basic/Card";

function BasicReact() {
  const data = [
    { id: 1, name: "Spiderman" },
    { id: 2, name: "Batman" },
    { id: 3, name: "Lego" }
  ];
  const [email, setEmail] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showDate, setShowDate] = useState(false);

  const handleClick = (age, name) => {
    alert("Button clicked !");
    console.log(name, age);
  };

  const handleSubmit = (event, data) => {
    event.preventDefault();
    console.log("Submit", data);
  };

  const handleReset = (event) => {
    event.preventDefault();
    console.log("Reset");
  };

  const handleChangeEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };
  const handleSearch = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      console.log("User Press Enter !");
      console.log("Keyword : ", event.target.value);
    }
  };
  const handleDetailMovie = (id, data) => {
    console.log("Detail Clicked", id);
    console.log(data);
  };

  return (
    <div className="text-center">
      <h1>Basic React Page</h1>
      <hr />
      <h3>Component</h3>
      <Navbar />
      <hr />
      <Card name="Spiderman" category="Action" handleDetail={handleDetailMovie} />
      <hr />
      <h3>Mapping</h3>
      {/* {data.map(() => ())} */}
      {data.map((item, index) => (
        <div key={item.id}>
          <button>{item.name}</button>
        </div>
      ))}
      <h3>Event</h3>
      <h5>Button</h5>
      {/* onClick */}
      <button onClick={handleClick} className="btn btn-primary">
        Click Me !
      </button>
      <button onClick={() => handleClick(1, "Bagus")}>Click Me !</button>
      {/* onSubmit & onReset digunakan untuk handling di dalam tag form dimana harus menambahkan event.preventDefault() supaya page tidak ke reload */}
      <form
        // onSubmit={(event) => handleSubmit(event, "data")}
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {/* INPUT EMAIL */}
        <button onClick={handleClick}>onClick</button>
        <button type="submit">onSubmit</button>
        <button type="reset">onReset</button>
      </form>
      <h5>Input</h5>
      {/* onChange */}
      <input
        type="email"
        placeholder="Input your email ..."
        // [1]
        // onChange={handleChangeEmail}
        // [2]
        onChange={(event) => setEmail(event.target.value)}
      />
      <h6>Your email is {email}</h6>
      {/* onKeyPress */}
      <input type="text" placeholder="Search ..." onKeyPress={handleSearch} />
      <h3>Conditional Rendering</h3>
      <h5>Short Logic</h5>
      {/* Type Data Boolean setShowDate(!showDate) */}
      <button onClick={() => setShowDate(!showDate)}>Show Date</button>
      {showDate && <h1>{new Date().toLocaleDateString()}</h1>}
      <h5>Ternary Operator</h5>
      {/* {data.length > 0 ? () : ()} */}
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={item.id}>
            <button>{item.name}</button>
          </div>
        ))
      ) : (
        <h6>Data Not Found</h6>
      )}
      <h3>Style In React</h3>
      {/* global */}
      <h1 className="heading">Hello World</h1>
      {/* react module */}
      <h1 className={`${styles.heading} ${styles.textUnderline} text-center`}>Hello World</h1>
      <h1 className={(styles.heading, styles.textUnderline)}>Hello World</h1>
      <h1 className={styles.heading2}>Hello World</h1>
      <hr />
    </div>
  );
}

export default BasicReact;