import React, { useState, useEffect } from "react";
import "./VideoUpload.css";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const VideoUpload = () => {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    videoType: "",
  });

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate()

  const handleOnChangeInput = (e, name) => {
    setInputField({
      ...inputField,
      [name]: e.target.value,
    });
  };

  const uploadImage = async (e, type) => {
    setLoader(true);
    console.log("uploaded");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "youtube-clone");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/ashucloud8644/${type}/upload`,
        data
      );
      const url = response.data.url;
      setLoader(false);
      let val = type === "image" ? "thumbnail" : "videoLink";
      setInputField({
        ...inputField,
        [val]: url,
      });
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  console.log(inputField);

  useEffect(() => {
    let isLogin = localStorage.getItem('userId')
    if (!isLogin) {
      navigate('/')
    }
  })

  const handleSubmitBtn = async () => {
    setLoader(true)
    await axios.post('http://localhost:4000/api/video', inputField, { withCredentials: true })
      .then(res => {
        console.log(res)
        setLoader(false)
        navigate('/')
      }).catch(err => {
        console.log(err)
        setLoader(false)
      })
  }

  return (
    <div className="videoupload">
      <div className="uploadBox">
        {/* Title */}
        <div className="uploadVideoTitle">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
          Upload Video
        </div>

        {/* Upload Form */}
        <div className="uploadForm">
          <input
            type="text"
            placeholder="Title of Video"
            value={inputField.title}
            onChange={(e) => {
              handleOnChangeInput(e, "title");
            }}
            className="uploadFormInputs"
          />
          <input
            type="text"
            placeholder="Description"
            value={inputField.description}
            onChange={(e) => {
              handleOnChangeInput(e, "description");
            }}
            className="uploadFormInputs"
          />
          <input
            type="text"
            placeholder="Category"
            value={inputField.videoType}
            onChange={(e) => {
              handleOnChangeInput(e, "videoType");
            }}
            className="uploadFormInputs"
          />

          {/* Thumbnail */}
          <div>
            Thumbnail
            <input
              type="file"
              accept="image/*"
              onChange={(e) => uploadImage(e, "image")}
            />
          </div>

          {/* Video */}
          <div>
            Video{" "}
            <input
              type="file"
              accept="video/mp4, video/webm, video/*"
              onChange={(e) => uploadImage(e, "video")}
            />
          </div>

          {/* Loader */}
          {loader && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </div>

        {/* Button */}
        <div className="uploadBtns">
          <div className="btn" onClick={handleSubmitBtn}>Upload</div>
          <Link to={"/"} className="btn">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
