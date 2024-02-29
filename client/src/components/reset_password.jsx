import React from 'react'
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'


function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const { id, token } = useParams()
    const [passMatchErr, setPassMatchErr] = useState(false);
    const comparePassword = password;
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

    // axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(password);
        axios.post(`http://localhost:3001/reset-password/${id}/${token}`, { password }).then((res) => {
            alert(res.data.message);
            if (res.data.status == "ok") {
                navigate("/login");
                // return window.location.href = "/login";
            }
        });
    };

    const isLoggedIn = window.localStorage.getItem("loggedIn");
    console.log(window.localStorage.getItem("user-role"));

    if (isLoggedIn == "true") {
        return window.location.href = "/";
    }
    return (
        <div className="d-flex justify-content-center align-items-center bg-orange-500 vh-100">
            <div className="bg-blue-400 p-3 rounded w-25">
                <h4>Reset Password</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>New Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control bg-slate-600  rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Confirm New Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            name="reEnterPassword"
                            className="form-control bg-slate-600  rounded-0"
                            onChange={passMatchHandler}
                        />
                    </div>
                    {passMatchErr ? (
                        <span className="error">Mismatch Password</span>
                    ) : (
                        ""
                    )}
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;