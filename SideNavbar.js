import React from "react";
import "./SideNavbar.css";
import HomeIcon from "@mui/icons-material/Home";
import VideocamIcon from "@mui/icons-material/Videocam";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import HistoryIcon from "@mui/icons-material/History";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { Link } from "react-router-dom";

const SideNavbar = ({ sideNavbar }) => {
  return (
    <div className={sideNavbar ? "home-sideNavbar" : "homeSideNavbarHide"}>
      {/* Top */}
      <div className="home_sideNavbarTop">
        <div className={`home_sideNavbarTopOption`}>
          <HomeIcon />
          <Link to={"/"} className="home_sideNavbarTopOptionTitle">
            Home
          </Link>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <VideocamIcon />
          <div className="home_sideNavbarTopOptionTitle">Shorts</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <SubscriptionsIcon />
          <div className="home_sideNavbarTopOptionTitle">Subscription</div>
        </div>
      </div>

      {/* Middle */}
      <div className="home_sideNavbrMiddle">
        <div className={`home_sideNavbarTopOption`}>
          <div className="home_sideNavbarTopOptionTitle">You</div>
          <ChevronRightIcon />
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <RecentActorsIcon />
          <div className="home_sideNavbarTopOptionTitle">Your Channel</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <HistoryIcon />
          <div className="home_sideNavbarTopOptionTitle">History</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <PlaylistPlayIcon />
          <div className="home_sideNavbarTopOptionTitle">Playlist</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <SmartDisplayIcon />
          <div className="home_sideNavbarTopOptionTitle">Your Videos</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <WatchLaterIcon />
          <div className="home_sideNavbarTopOptionTitle">Watch later</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <ThumbUpIcon />
          <div className="home_sideNavbarTopOptionTitle">Liked videos</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <ContentCutIcon />
          <div className="home_sideNavbarTopOptionTitle">Your clips</div>
        </div>
      </div>

      {/* Bottom */}
      <div className="home_sideNavbrMiddle">
        <div className="home_sideNavbarTopOption">
          <div className="home_sideNavbarTopOptionTitleHeader">
            Subscription
          </div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201405/aaj_tak-story_650_052214073411.jpg?size=770:433"
            className="home_sideNavbar_ImgLogo"
            alt=""
          />
          <div className="home_sideNavbarTopOptionTitle">Aaj Tak</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            src="https://play-lh.googleusercontent.com/ZRps514Pxb3K2qnyKKOihLV7vAJay-ff68q9eLnfX1pqA5_l15dPzto8EKCC_WKnGDh-"
            className="home_sideNavbar_ImgLogo"
            alt=""
          />
          <div className="home_sideNavbarTopOptionTitle">Taja Khabar</div>
        </div>

        <div className="home_sideNavbarTopOption">
          <img
            src="https://i.pinimg.com/736x/94/7e/40/947e405ff7b832e61e4c1de5913f51a3.jpg"
            className="home_sideNavbar_ImgLogo"
            alt=""
          />
          <div className="home_sideNavbarTopOptionTitle">NDTV India</div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
