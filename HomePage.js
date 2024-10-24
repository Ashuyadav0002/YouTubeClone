import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import axios from "axios";

const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([])

  // useEffect Fetch backend API
  useEffect(() => {
    axios.get('http://localhost:4000/api/getAllVideo').then(res => {
      // console.log(res.data.videos)
      setData(res.data.videos)
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const options = [
    "All",
    "T20 Cricket",
    "Music",
    "Live",
    "Mixes",
    "Music",
    "Gaming",
    "Dabated",
    "Coke Studio Pakistan",
    "Democracy",
    "Coke Studio Pakistan",
    "Pakistani Dramas",
    "Comedy",
    "Coke Studio Pakistan",
    "Serials",
    "Music",
    "Music",
  ];
  return (
    <div className={sideNavbar ? "homepage" : "fullHomePage"}>
      <div className="homePage_options">
        {options.map((item, index) => {
          return (
            <div key={index} className="homePage_option">
              {item}
            </div>
          );
        })}
      </div>

      <div
        className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}
      >

        {
          data?.map((item, ind) => {
            return (
              <Link to={`/watch/${item._id}`} className="youtube_video">
                <div className="youtube_thumbnailBox">
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="youtube_thumbnailPic"
                  />
                  <div className="youtube_timingThumbnail">28:05</div>
                </div>

                <div className="youtubeTitleBox">
                  <div className="youtubeTitleBoxProfile">
                    <img
                      src={item.user.profilePic}
                      alt="Profile"
                      className="youtube_thumbnail_Profile"
                    />
                  </div>

                  <div className="youtubeTitleBox_Title">
                    <div className="youtube_videoTitle">{item.title}</div>
                    <div className="youtube_channelName">{item.user.channelName}</div>
                    <div className="youtubeVideo_Likes">{item.like}</div>
                  </div>
                </div>
              </Link>
            )
          })
        }

      </div>
    </div>
  );
};

export default HomePage;
