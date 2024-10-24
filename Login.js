import React, { useState } from "react";
import "./Login.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Login = ({ setLoginModel }) => {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  const [progressBar, setProgressBar] = useState(false)

  const handleOnChangeInput = (e, name) => {
    setLoginField({
      ...loginField,
      [name]: e.target.value,
    });
  };

  const handleLoginFun = async () => {
    setProgressBar(true)
    axios.post('http://localhost:4000/auth/signin', loginField, { withCredentials: true }).then(res => {
      console.log(res)
      setProgressBar(false)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("userId", res.data.User._id)
      localStorage.setItem("userProfilePic", res.data.User.profilePic)
      window.location.reload();
    }).catch(err => {
      toast.error('Invalid Credientials')
      console.log(err)
      setProgressBar(false)
    })
  }

  return (
    <div className="login">
      <div className="login_card">
        {/* Title */}
        <div className="titleCard_login">
          <YouTubeIcon
            sx={{ fontSize: "54px" }}
            className="login_youtubeImage"
          />
          Login
        </div>

        {/* Inputs */}
        <div className="LoginCredentials">
          {/* Username */}
          <div className="userNameLogin">
            <input
              type="text"
              className="userNameLoginUserName"
              value={loginField.userName}
              onChange={(e) => handleOnChangeInput(e, "userName")}
              placeholder="UserName"
            />
          </div>
          {/* Password */}
          <div className="userNameLogin">
            <input
              type="password"
              className="userNameLoginUserName"
              value={loginField.password}
              onChange={(e) => handleOnChangeInput(e, "password")}
              placeholder="Password"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="buttons">
          <div className="login_btn" onClick={handleLoginFun}>Login</div>
          <Link
            to={"/signup"}
            className="login_btn"
            onClick={() => setLoginModel()}
          >
            SignUp
          </Link>
          <div className="login_btn" onClick={() => setLoginModel()}>
            Cancel
          </div>
        </div>
        {progressBar && <Box sx={{ width: '100%', paddingTop: "10px" }}>
          <LinearProgress />
        </Box>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
