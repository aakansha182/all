import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import LogoLight from "../assets/website/logo.png";
import LogoDark from "../assets/website/logoDark.png";
//Imported icons
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { MdMarkEmailRead } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { FaGenderless } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import "../cStyles/register_login.css";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    gender: "",
    dob: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  //validation for fullname
  const handleName = (e) => {
    let inputValue = e.target.value.replace(/[^a-z]/gi, "");
    setUser((prevUser) => ({ ...prevUser, name: inputValue }));
  };

  // validation for username
  const [unameErr, setUnameErr] = useState(false);
  const unameHandler = (e) => {
    let inputValue = e.target.value;
    if (inputValue.trim() === "") {
      setUnameErr(false);
    } else if (inputValue.length < 3) {
      setUnameErr(true);
    } else {
      setUnameErr(false);
    }
    setUser((prevUser) => ({ ...prevUser, username: inputValue }));
    // setUser({ username: item });
  };

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
  const passHandler = (e) => {
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

  const [passMatchErr, setPassMatchErr] = useState(false);
  const comparePassword = user.password;
  const passMatchHandler = (e) => {
    let rePass = e.target.value;

    if (rePass.trim() === "") {
      setPassMatchErr(false);
    } else if (rePass !== comparePassword) {
      // console.log("cp: " + comparePassword);
      setPassMatchErr(true);
    } else {
      setPassMatchErr(false);
    }

    setUser((prevUser) => ({ ...prevUser, reEnterPassword: rePass }));
  };

  const register = (e) => {
    e.preventDefault();
    const { name, username, gender, dob, email, password, reEnterPassword } =
      user;

    console.log("inputs : " + user);
    if (!emailPattern.test(email)) {
      setEmailError(true);
    } else if (password.length < 6) {
      setPassErr(true);
    } else if (
      name &&
      username &&
      gender &&
      dob &&
      email &&
      password &&
      password === reEnterPassword
    ) {
      axios.post("http://localhost:3001/register", user).then((res) => {
        alert(res.data.message);
        if (res.data.status == "ok") {
          navigate("/login");
          // return window.location.href = "/login";
        }
      });
    } else {
      alert("invalid input");
      // setPassMatchErr(true);
    }
  };

  const isLoggedIn = window.localStorage.getItem("loggedIn");
  console.log(window.localStorage.getItem("user-role"));

  if (isLoggedIn == "true") {
    return window.location.href = "/";
  }

  return (
    <>
      <div className="registerPage flexDiv">
        <div className="contanier flexDiv">
          <div className="videoDiv">
            <img
              src={"/assests/exp.gif"}
              alt="Logo Image"
              className="absolut"
            />
            <div className="textDiv">
              <h2 className="title">Explore the books</h2>
              <p>Books at your fingertips!!</p>
            </div>
            <div className="footerDiv flexDiv">
              <span className="text">Already have an account?</span>
              <Link to={"/login"}>
                <button className="btn">Sign In</button>
              </Link>
            </div>
          </div>

          <div className="fromDiv">
            <div className="headerDiv flex flex-col items-center justify-center overflow-hidden">
              <img src={LogoDark} alt="Logo" className="logo-dark" />
              <img src={LogoLight} alt="Logo" className="logo-light" />

              <h3 className="lineH3">Let us Know about you!!</h3>
            </div>

            <form onSubmit={register} className="form scrollDi">
              <div className="inputDiv">
                <label htmlFor="name">Name</label>
                <div className="input flexDiv">
                  <CiFaceSmile className="icon" />
                  <input
                    type="text"
                    name="name"
                    value={user.name} //changes
                    placeholder="Your Name"
                    onChange={handleName} //changes
                  ></input>
                </div>
              </div>
              <div className="inputDiv">
                <label htmlFor="username">Username</label>
                <div className="input flexDiv">
                  <FaUserShield className="icon" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Set Username"
                    value={user.username} //changes
                    onChange={unameHandler} //changes and on line 179
                  // onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {unameErr ? (
                  <span className="error">Username Not Valid</span>
                ) : (
                  ""
                )}
              </div>
              <div className="inputDiv">
                <label htmlFor="gender">Gender</label>
                <div className="input flexDiv">
                  <FaGenderless className="icon" />
                  <input
                    type="radio"
                    value="Male"
                    name="gender"
                    // value={user.gender}
                    onChange={handleChange}
                  />{" "}
                  Male
                  <input
                    type="radio"
                    value="Female"
                    name="gender"
                    // value={user.gender}
                    onChange={handleChange}
                  />{" "}
                  Female
                  <input
                    type="radio"
                    value="Other"
                    name="gender"
                    // value={user.gender}
                    onChange={handleChange}
                  />{" "}
                  Other
                </div>
              </div>
              <div className="inputDiv">
                <label htmlFor="DOB">Date Of Birth</label>
                <div className="input flexDiv">
                  <MdDateRange className="icon" />
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    placeholder="Enter DOB"
                    value={user.dob}
                    onChange={handleChange}
                  // onChange={(e) => setDob(e.target.value)}
                  />
                </div>
              </div>

              <div className="inputDiv">
                <label htmlFor="email">Email</label>
                <div className="input flexDiv">
                  <MdMarkEmailRead className="icon" />
                  <input
                    type="text"
                    name="email"
                    value={user.email} //changes
                    placeholder="Your Email"
                    onChange={handleEmail} //changes and on line 239
                  />
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
                    value={user.password} //changes
                    placeholder="Set Password"
                    onChange={passHandler} //changes and on line 253
                  />
                </div>
                {passErr ? (
                  <span className="error">
                    Password must have 6 characters{" "}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="inputDiv">
                <label htmlFor="password">Confirm Password</label>
                <div className="input flexDiv">
                  <BsFillShieldLockFill className="icon" />
                  <input
                    type="password"
                    name="reEnterPassword"
                    value={user.reEnterPassword}
                    placeholder="Re-enter Password"
                    onChange={passMatchHandler}
                  />
                </div>
                {passMatchErr ? (
                  <span className="error">Mismatch Password</span>
                ) : (
                  ""
                )}
              </div>
              <button type="submit" className="btn flexDiv">
                <span>Register</span>
                <AiOutlineSwapRight className="icon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
