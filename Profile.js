import React, { useEffect, useState } from "react";
import "./Profile.css";
import SideNavbar from "../../Components/SideNavbar/SideNavbar";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = ({ sideNavbar }) => {

  const { id } = useParams();

  // useState
  const [data, setData] = useState([])
  const [user, setUser] = useState(null)

  const fetchProfileData = async () => {
    await axios.get(`http://localhost:4000/api/${id}/channel`).then(res => {
      setData(res.data.video)
      setUser(res.data.video[0]?.user)
    }).catch(err => {
      console.log(err)
    })
  }

  // useEffect
  useEffect(() => {
    fetchProfileData();
  })


  return (
    <div className="profile">
      {/* Left */}
      <SideNavbar sideNavbar={sideNavbar} />

      {/* Right Top */}
      <div className={sideNavbar ? "profile_Page" : "profile_page_inactive"}>
        {/* Profile Top Section */}
        <div className="profile_top_section">
          <div className="profile_top_section_profile">
            <img
              src={user?.profilePic}
              alt=""
              className="profile_top_section_img"
            />
          </div>

          <div className="profile_top_section_About">
            <div className="profile_tiop_section_About_Name">{user?.channelName}</div>
            <div className="profile_top_section_Info">{user?.userName} . {data?.length} video</div>
            <div className="profile_top_section_Info">
              {user?.about}
            </div>
          </div>
        </div>

        {/* Right Bottom */}
        <div className="profile_videos">
          <div className="profile_videos_title">
            Videos &nbsp; <ArrowRightIcon />
          </div>

          <div className="profileVideos">
            {
              data.map((item, key) => {
                return (
                  <Link to={`/watch/${item?.user?._id}`} className="profileVideo_block">
                    <div className="profilkeVideo_block_thumbnail">
                      <img
                        src={item?.thumbnail}
                        alt=""
                        className="profilkeVideo_block_thumbnail_img"
                      />
                    </div>

                    <div className="profileVideo_block_detail">
                      <div className="profileVideo_block_detail_name">
                        {item?.title}
                      </div>
                      <div className="profileVideo_block_detail_about">
                        Created at {item?.createdAt.slice(0, 10)}
                      </div>
                    </div>
                  </Link>
                )
              })
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
