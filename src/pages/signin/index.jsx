import React, { useState } from 'react'
import "./index.css"
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

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
    }
  };

  const handleSignup = () => {
    document.title = "Tickitz | Sign In";
    navigate("/register");
  };

  return (
    <main>
      <section className="banner">
        <div className="banner__overlay">
          <div>
            <img
              src={require("../../assets/tickitz 1.png")}
              alt=""
              className="banner__overlay__title"
            />
          </div>
          <div className="banner__overlay__label">wait, watch, wow!</div>
        </div>
        <img
          src={require("../../assets/homescreen.png")}
          alt="Image Marvel"
          className="banner__img"
        />
      </section>
      <div className="signin">
        <div className="header__logo">
          <img src={require("../../assets/Tickitz 2.png")} alt="logo" />
        </div>
        <div className="header__signin">Sign In</div>
        <div className="header__signin--comment">
          Sign in with your data that you entered during your registration
        </div>
        <form onSubmit={handleSubmit}>
          <div className="header__detail">Email</div>
          <input
            type="email"
            placeholder="Input email"
            name="email"
            value={form.email}
            className='join__input'
            onChange={handleChangeForm}
          />
          <div className="header__detail">Password</div>
          <input
            type="password"
            placeholder="Input Password"
            name="password"
            value={form.password}
            className='join__input'
            onChange={handleChangeForm}
          />
          <div>
          {!message ? null : isError ? (
            <div className="alert alert-danger" role="alert">
              {message}
          </div>
          ) : (
            <div className="alert alert-primary" role="alert">
              {message}
          </div>
          )}
          </div>
          <div>
            <button className="signin__button" type='submit'>Sign In</button>
          </div>
        </form>
        <div className="signin--comment">
          Forget your pasword? <u className="signup">Reset Now</u>
        </div>
        <div className="signin--comment">
          Don't have an acount? <a onClick={handleSignup} className="signup">Sign Up</a>
        </div>
      </div>
    </main>
  )
}

export default Login