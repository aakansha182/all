import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LogoLight from "../assets/website/logo.png";
import LogoDark from "../assets/website/logoDark.png";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import "../cStyles/register_login.css";

const Login = () => {
  // const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //validation for email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [emailError, setEmailError] = useState(false);
  const handleEmail = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim() === "") {
      setEmailError(false);
    } else if (!emailPattern.test(inputValue)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    // setUser({ email: inputValue });
    setUser((prevUser) => ({ ...prevUser, email: inputValue }));
  };

  //validation for password
  const [passErr, setPassErr] = useState(false);
  const handlePswd = (e) => {
    let pswd = e.target.value;
    if (pswd.trim() === "") {
      setPassErr(false);
    } else if (pswd.length < 6) {
      setPassErr(true);
    } else {
      // setUser({ password: pswd });
      setPassErr(false);
    }
    // setUser({ password: pswd });
    setUser((prevUser) => ({ ...prevUser, password: pswd }));
  };

  const login = (e) => {
    e.preventDefault();
    if (!emailPattern.test(user.email)) {
      setEmailError(true);
    } else if (user.password.length < 6) {
      setPassErr(true);
    } else {
      axios.post("http://localhost:3001/login", user).then((res) => {
        if (res.data.status === "ok") {
          // console.log(res.data.user?.email);
          // navigate("/");
          window.localStorage.setItem("user", JSON.stringify(res.data.user));
          window.localStorage.setItem("token", res.data.token);
          alert(res.data.message);
          return (window.location.href = "/");
        } else {
          alert(res.data.message);
        }
      });
    }
  };

  const uData = JSON.parse(window.localStorage.getItem("user"));

  if (uData && uData?.role) {
    return (window.location.href = "/");
  }
  return (
    <>
      <div className="loginPage flexDiv">
        <div className="contanier flexDiv">
          <div className="videoDiv w-[60%] h-[60%]">
            {/* <video src={video} autoPlay muted loop></video> */}
            <img src="/assests/exp.gif" alt="Logo Image" className="absolut" />
            <div className="textDiv">
              <h2 className="title">Explore the books </h2>
              <p>Books at your fingertips!!</p>
            </div>
            <div className="footerDiv flexDiv">
              <span className="text">Don't have an account? </span>
              <Link to={"/register"}>
                <button className="btn">Sign Up</button>
              </Link>
            </div>
          </div>

          <div className="fromDiv flexDiv">
            <div className="headerDiv overflow-hidden">
              <img src={LogoDark} alt="Logo" className="logo-dark" />
              <img src={LogoLight} alt="Logo" className="logo-light" />
              <h3 className="lineH3">Welcome Back Guys!!</h3>
            </div>
            <form onSubmit={login} className="form">
              <span className="showMessage">Login Status will go here</span>
              <div className="inputDiv">
                <label htmlFor="username">Email ID</label>
                <div className="input flexDiv">
                  <FaUserShield className="icon" />
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleEmail}
                    required
                    placeholder="Enter your Email"
                  ></input>
                </div>
                {emailError ? (
                  <span className="error">Email Not Valid</span>
                ) : (
                  ""
                )}
              </div>
              <div className="inputDiv">
                <label htmlFor="password">Password</label>
                <div className="input flexDiv">
                  <BsFillShieldLockFill className="icon" />
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handlePswd}
                    required
                    placeholder="Enter your Password"
                  ></input>
                </div>
                {passErr ? (
                  <span className="error">
                    Password must have 6 characters{" "}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <button type="submit" className="btn flexDiv">
                <span>Login</span>
                <AiOutlineSwapRight className="icon" />
              </button>

              <span className="forgotPassword">
                Forgot password? <Link to="/forgortpassword">Click Here</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
