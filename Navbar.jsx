import React, { useState, useEffect } from "react";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import axios from "axios";

const Navbar = ({ setSideNavbarFun, sideNavbar }) => {
  const [userPic, setUserPic] = useState(
    "https://www.gmac-cambodia.org/files/public/member_logo/no_logo.png"
  );
  const [navbarModel, setNavbarModel] = useState(false);
  const [login, setLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const sideNavbarFunc = () => {
    setSideNavbarFun(!sideNavbar);
  };

  const handleprofile = () => {
    let userId = localStorage.getItem("userId");
    navigate(`/user/${userId}`);
    setNavbarModel(false);
  };

  const setLoginModel = () => {
    setLogin(false);
  };

  const onclickOfPopUpOption = (button) => {
    setNavbarModel(false);
    if (button === "login") {
      setLogin(true);
    } else {
      localStorage.clear();
      getLogoutFun();
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    }
  };

  const getLogoutFun = async () => {
    axios
      .post("http://localhost:4000/auth/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log("LogOut");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let userProfilePic = localStorage.getItem("userProfilePic");
    setIsLoggedIn(localStorage.getItem("userId") !== null ? true : false);
    if (userProfilePic !== null) {
      setUserPic(userProfilePic);
    }
  });

  return (
    <div className="navbar">
      {/* Navbar Left */}
      <div className="navbar-left">
        <div className="navbarHamberger" onClick={sideNavbarFunc}>
          <MenuIcon sx={{ color: "white" }} />
        </div>

        {/* Youtube Logo */}
        <Link to={"/"} className="navbar_youtubeImg">
          <YouTubeIcon
            sx={{ fontSize: "34px" }}
            className="navbar_youtubeImage"
          />
          <div className="navbar_utubeTitle">YouTube</div>
        </Link>
      </div>

      {/* Navbar Middle */}
      <div className="navbar-middle">
        <div className="navbar_searchBox">
          <input
            type="text"
            placeholder="Search"
            className="navbar_searchBoxInput"
          />
          <div className="navbar_searchIconBox">
            <SearchIcon sx={{ fontSize: "28px", color: "white" }} />
          </div>

          <div className="navbar_speaker">
            <KeyboardVoiceIcon sx={{ fontSize: "28px", color: "white" }} />
          </div>
        </div>
      </div>

      {/* Navbar Right */}
      <div className="navbar-right">
        <Link to={"/1234/upload"}>
          <VideoCallIcon
            sx={{ fontSize: "30px", color: "white", cursor: "pointer" }}
          />
        </Link>
        <NotificationsIcon
          sx={{ fontSize: "30px", color: "white", cursor: "pointer" }}
        />
        <img
          onClick={() => {
            setNavbarModel((prev) => !prev);
          }}
          src={userPic}
          alt=""
          className="navbar-right-logo"
        />

        {navbarModel && (
          <div className="navbar-model">
            {isLoggedIn && (
              <div className="navbar-model-option" onClick={handleprofile}>
                Profile
              </div>
            )}

            {isLoggedIn && (
              <div
                className="navbar-model-option"
                onClick={() => onclickOfPopUpOption("logout")}
              >
                Logout
              </div>
            )}

            {!isLoggedIn && (
              <div
                className="navbar-model-option"
                onClick={() => onclickOfPopUpOption("login")}
              >
                Login
              </div>
            )}
          </div>
        )}
      </div>
      {login && <Login setLoginModel={setLoginModel} />}
    </div>
  );
};

export default Navbar;
