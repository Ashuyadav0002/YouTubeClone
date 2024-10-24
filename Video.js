import React, { useState, useEffect } from "react";
import "./Video.css";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Video = () => {
  const [message, setMessage] = useState();
  const [data, setData] = useState(null)
  const [videoUrl, setVideoUrl] = useState("")
  const [comments, setComments] = useState([])
  const { id } = useParams();

  // Fetch Video By Id
  const fetchVideoById = async () => {
    await axios.get(`http://localhost:4000/api/getVideoById/${id}`).then((res) => {
      setData(res.data.video)
      setVideoUrl(res.data.video.videoLink)
    }).catch((err) => {
      console.log(err)
    })
  }

  // Get Comment By Video Id
  const getCommentByVideoId = async () => {
    await axios.get(`http://localhost:4000/commentApi/comment/${id}`).then((res) => {
      // console.log(res)
      setComments(res.data.comments)
    }).catch((err) => {
      console.log(err)
    })
  }
  // useEffect Fetch backend API
  useEffect(() => {
    fetchVideoById();
    getCommentByVideoId();
  })

  const handleComment = async () => {
    const body = {
      "message": message,
      "video": id
    }
    await axios.post('http://localhost:4000/commentApi/comment', body, { withCredentials: true })
      .then(res => {
        const newComment = res.data.comment
        setComments([newComment, ...comments])
        setMessage('')
      }).catch(err => {
        toast.error("Please login first to comment")
      })
  }

  return (
    <div className="video">
      <div className="videoPostSection">
        {/* Video */}
        <div className="video_youtube">
          {
            data && <video width="400" height="400" controls autoPlay className="video_youtube_video">

              <source src={videoUrl} type="video/mp4" />
              <source src={videoUrl} type="video/webm" />

              Your browser does not support the video tag

            </video>
          }
        </div>

        <div className="video_youtubeAbout">
          {/* Video Heading */}
          <div className="video_utubeTitle">{data?.title}</div>

          <div className="youtube_video_ProfileBlock">
            {/* Left */}
            <div className="youtube_video_ProfileBlock_left">
              {/* Profile Pic */}
              <Link
                to={`/user/${data?.user?._id}`}
                className="youtube_video_ProfileBlock_left_Img"
              >
                <img
                  src={data?.user?.profilePic}
                  alt=""
                  className="uoutube_video_ProfileBlock_Left_Image"
                />
              </Link>

              <div className="youtubeVideo_subViews">
                {/* Profile Name */}
                <Link to={`/user/${data?.user?._id}`} className="youtubePostProfileName">
                  {data?.user?.channelName}
                </Link>

                {/* Date */}
                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0, 10)}</div>
              </div>

              {/* Subscribe Button */}
              <div className="subscribeBtnYouTube">Subscribe</div>
            </div>

            {/* Right */}
            <div className="youtube_video_likeBlock">
              {/* Like */}
              <div className="youtube_video_likeBlocl_Like">
                <ThumbUpOutlinedIcon />
                <div className="youtube_video_likeBlock_noOfLikes">{data?.like}</div>
              </div>

              {/* Divider */}
              <div className="youtubeVideoDivider"></div>

              {/* Dislike */}
              <div className="youtube_video_likeBlocl_Like">
                <ThumbDownOutlinedIcon />
              </div>
            </div>
          </div>

          {/* Video Description */}
          <div className="youtube_video_about">
            <div>{data?.createdAt.slice(0, 10)}</div>
            <div>{data?.description}</div>
          </div>

          {/* Comments Section */}
          <div className="youTubeCommentSection">
            <div className="youtubeCommentSectionTitle">{comments.length} Comments</div>

            {/* Self Comment */}
            <div className="youtubeSelfComment">
              {/* Profile Pic */}
              <img
                src={data?.user?.profilePic}
                alt=""
                className="video_youtubeSelfCommentProfile"
              />

              {/* Input Comment Tag */}
              <div className="addAComment">
                <input
                  type="text"
                  className="addCommentInput"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  placeholder="Add a comment..."
                />

                {/* Submit & Cancle Button */}
                <div className="cancleSubmitButton">
                  <div className="Comment">Cancle</div>
                  <div className="Comment" onClick={handleComment}>Comment</div>
                </div>
              </div>
            </div>

            {/* Comment By Other Users */}
            <div className="youtubeIOthersComment">

              {
                comments.map((item, index) => {
                  return (
                    <div className="youtubeSelfComment">
                      {/* Other User Profile */}
                      <img
                        src={item?.user?.profilePic}
                        alt=""
                        className="video_youtubeSelfCommentProfile"
                      />

                      <div className="othersCommentSection">
                        <div className="otherCommentSectionHeader">
                          <div className="channelNameComment">{item?.user?.channelName}</div>
                          <div className="commentTimingOthers">{item?.createdAt.slice(0, 10)}</div>
                        </div>

                        <div className="otherCommentSectionComment">
                          {item?.message}
                        </div>
                      </div>
                    </div>
                  )
                })
              }


            </div>
          </div>
        </div>
      </div>

      {/* Video Suggestion Area */}
      <div className="videoSuggestions">

        <div className="videoSuggestionBlock">
          {/* Thumbnail */}
          <div className="video_Suggestion_Thumbnail">
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgmwEbWu9QIC41t1mN6tdDeNpy_8nY4jCbS8YZng7HA765gDJ-puv7E8Ts-7KD336VE6G0AqYa-8YYHtk-p02LDAOaisZ1_xl7yKZNe8USSzR8YTILpPlQwlH7Q75wT5x3G8iwCWIWCMYOeuEqHKSKpaC2CNP0CqHLQenlWnVnqzZTXYhTXVykRqBRrlA/w1200-h630-p-k-no-nu/ndtv.jpg"
              alt=""
              className="video_suggession_thumbnail_img"
            />
          </div>

          {/* Title */}
          <div className="video_suggestion_about">
            <div className="video_suggestion_about_title">
              T20 2024 worldcup Final IND vs SA Last 5 overs #cricket #india
            </div>
            <div className="video_suggestion_about_profile">Cricket 320</div>
            <div className="video_suggestion_about_profile">
              136K views . 1 day ago
            </div>
          </div>
        </div>

      </div>
      <ToastContainer />
    </div>
  );
};

export default Video;
