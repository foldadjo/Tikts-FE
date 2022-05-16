import React, { useState } from 'react'
import "./index.css"
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  document.title = "Tickitz | Sign Up";
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    noTelp: "",
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
      const resultRegister = await axios.post("auth/register", form);
      const resultName = await axios.get(`user/${resultRegister.data.data.id}`);
      console.log(resultRegister)
      const resultUser = [
        {
          id: resultRegister.data.data.id,
          name: resultName.data.data[0].name,
          role: resultName.data.data[0].role,
          image: resultName.data.data[0].image
        }
      ];
      setIsError(false);
      setMessage(resultRegister.data.msg);
      localStorage.setItem("token", resultRegister.data.data.token);
      localStorage.setItem("refreshToken", resultRegister.data.data.refreshToken);
      localStorage.setItem("dataUser", JSON.stringify(resultUser[0]));
      navigate("/");

    } catch (error) {
      console.log(error.response);
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };

  const handleSignin = () => {
    navigate("/login");
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
      <div className="signup">
        <div className="header__logo">
          <img src="assets/Tickitz 2.png" alt="logo" />
        </div>
        <div className="header__signup">Sign Up</div>
        <div className="header__signup--comment">Fill your additional details</div>
        <form onSubmit={handleSubmit}>
          <div className="header__detail">First Name</div>
          <input
            type="text"
            placeholder="Write your first name"
            name="firstName"
            value={form.firstName}
            className="join__input"
            onChange={handleChangeForm}
          />
          <div className="header__detail">Last Name</div>
          <input
            type="text"
            placeholder="Write your last name"
            name='lastName'
            value={form.lastName}
            className="join__input"
            onChange={handleChangeForm}
          />
          <div className="header__detail">Phone Number</div>
          <input
            type="tel"
            placeholder="Write your number phone"
            name='noTelp'
            value={form.noTelp}
            className="join__input"
            onChange={handleChangeForm}
          />
          <div className="header__detail">Email</div>
          <input
            type="email"
            placeholder="Write your email"
            name='email'
            value={form.email}
            className="join__input"
            onChange={handleChangeForm}
          />
          <div className="header__detail">Password</div>
          <input
            type="password"
            placeholder="Write your password"
            name='password'
            value={form.password}
            className="join__input"
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
            <button className="signup__button" type='submit'>Sign Up</button>
          </div>
        </form>
        <div className="header__signup--comment">
          Already have account? <a onClick={handleSignin} className="signin">Sign In</a>
        </div>
      </div>
    </main>
  )
}

export default Signup