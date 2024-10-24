import React, { useState } from "react";
import "./Signup.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Signup = () => {
  const [uploadImageUrl, setUploadImageUrl] = useState(
    "https://branfordhrs.com/wp-content/uploads/2023/04/profile-icon-9.jpg"
  );
  const [signUpField, setSignUpField] = useState({
    channelName: "",
    userName: "",
    password: "",
    about: "",
    profilePic: uploadImageUrl,
  });
  const navigate = useNavigate()

  const [progressBar, setProgressBar] = useState(false)

  const handleInputFields = (e, name) => {
    setSignUpField({
      ...signUpField,
      [name]: e.target.value,
    });
  };
  //   console.log(signUpField);
  const uploadImage = async (e) => {
    console.log("uploaded");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "youtube-clone");
    try {
      setProgressBar(true)
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ashucloud8644/image/upload",
        data
      );
      setProgressBar(false)
      const imageUrl = response.data.url;
      setUploadImageUrl(imageUrl);
      setSignUpField({
        ...signUpField,
        profilePic: imageUrl,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async () => {
    setProgressBar(true)
    axios.post('http://localhost:4000/auth/signup', signUpField).then(res => {
      toast.success(res.data.message)
      setProgressBar(false)
      navigate('/')
    }).catch(error => {
      console.log(error);
      setProgressBar(false)
      toast.error("Fill All Fields")
    })
  }

  return (
    <div className="signup">
      <div className="signup_card">
        {/* Title */}
        <div className="signup_title">
          <YouTubeIcon
            sx={{ fontSize: "54px" }}
            className="login_youtubeImage"
          />
          Signup
        </div>

        {/* Inputs */}
        <div className="signup_inputs">
          <input
            type="text"
            className="signup_input_inp"
            value={signUpField.channelName}
            onChange={(e) => {
              handleInputFields(e, "channelName");
            }}
            placeholder="Channel Name"
          />

          <input
            type="text"
            className="signup_input_inp"
            value={signUpField.userName}
            onChange={(e) => {
              handleInputFields(e, "userName");
            }}
            placeholder="User Name"
          />

          <input
            type="password"
            className="signup_input_inp"
            value={signUpField.password}
            onChange={(e) => {
              handleInputFields(e, "password");
            }}
            placeholder="Password"
          />

          <input
            type="text"
            className="signup_input_inp"
            value={signUpField.about}
            onChange={(e) => {
              handleInputFields(e, "about");
            }}
            placeholder="About Your Channel"
          />

          {/* Profile */}
          <div className="image_upload_signup">
            <input type="file" onChange={(e) => uploadImage(e)} />
            <div className="image_upload_signup_div">
              <img
                src={uploadImageUrl}
                alt=""
                className="image_default_signup"
              // value={signUpField.profilePic}
              />
            </div>
          </div>


          {/* Buttons */}
          <div className="Signup_btns">
            <div className="signUpBtn" onClick={handleSignup}>SignUp</div>
            <Link to={"/"} className="signUpBtn">
              Home
            </Link>
          </div>

          {progressBar && <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>}

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
