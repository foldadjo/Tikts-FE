import React, { useState } from "react";
import axios from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import "./index.css";

// FRONTEND
// 1. Slicing
// 2. Pembuatan fungsi
// 3. Integrasi
// 3.a input
// 3.b process
// 3.c output

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const resultLogin = await axios.post("auth/login", form);
      const resultUser = [
        {
          id: 1,
          name: "Bagus"
        }
      ];
      setIsError(false);
      setMessage(resultLogin.data.msg);
      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);
      localStorage.setItem("dataUser", JSON.stringify(resultUser[0]));
      navigate("/basic/home");

    } catch (error) {
      console.log(error.response);
      setIsError(true);
      setMessage(error.response.data.msg);
      setForm({
        email: "",
        password: ""
      });
    }
  };

  const handleReset = (event) => {
    // event.preventDefault();
    console.log("Reset Form");
    setForm({
      email: "",
      password: ""
    });
  };

  return (
    <div className="text-center container">
      <h1 className="login__header">Login Page</h1>
      {!message ? null : isError ? (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      ) : (
        <div className="alert alert-primary" role="alert">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} onReset={handleReset}>
        <input
          type="email"
          placeholder="Input email"
          name="email"
          value={form.email}
          onChange={handleChangeForm}
        />
        <br />
        <input
          type="password"
          placeholder="Input Password"
          name="password"
          value={form.password}
          onChange={handleChangeForm}
        />
        <br />
        <button className="btn btn-outline-primary" type="reset">
          Reset
        </button>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;