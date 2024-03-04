import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Avatar,
  Typography,
  InputBase,
  Button,
} from "@mui/material";
import { tokens } from "../../theme.js";
import axios from "axios";
import toast from "react-hot-toast";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/ShareSharp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ProfileImage from "../Images/WIN_20230918_16_20_02_Pro.jpg";
import { useSelector } from "react-redux";
import { baseURL } from "../../Urls.js";
const ProfilePost = ({ detail }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  console.log(detail);
  // const [count, setCount] = useState(0);

  const [comments, setComments] = useState([]);
  const [commentwriting, setCommentwriting] = useState("");

  //Hiển thị khung bình luận
  const [show, setShow] = useState(false);

  const [user, setUser] = useState([]);
  const userDetails = useSelector((state) => state.user);
  let users = userDetails?.user;
  const userId = users.other._id;
  const accessToken = users.accessToken;

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/v1/user/post/user-details/${detail.user}`
      );
      setUser(data.others);
    } catch (error) {
      console.log(error);
      toast.error("Xảy ra lỗi khi nhận dữ liệu");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  console.log(user);

  // const handleLike = async () => {
  //   if (like.type === ThumbUpIcon) {
  //     await fetch(`http://localhost:8080/api/v1/post/${post._id}/like`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/Json", token: accessToken },
  //     });
  //     setLike(<ThumbUpAltIcon sx={{ color: "#1877F2" }} />);
  //     setCount(count + 1);
  //   } else {
  //     await fetch(`http://localhost:8080/api/v1/post/${post._id}/like`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/Json", token: accessToken },
  //     });
  //     setLike(<ThumbUpIcon />);
  //     setCount(count - 1);
  //   }
  // };
  const [like, setLike] = useState(
    detail.like.includes(userId) ? (
      <ThumbUpIcon sx={{ color: "#1877F2" }} />
    ) : (
      <ThumbUpIcon />
    )
  );
  const [count, setCount] = useState(detail.like.length);
  const handleLike = async () => {
    if (like.type === ThumbUpIcon) {
      await fetch(`http://localhost:8080/api/v1/post/${detail._id}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/Json", token: accessToken },
      });
      setLike(<ThumbUpAltIcon sx={{ color: "#1877F2" }} />);
      setCount(count + 1);
    } else {
      await fetch(`http://localhost:8080/api/v1/post/${detail._id}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/Json", token: accessToken },
      });
      setLike(<ThumbUpIcon />);
      setCount(count - 1);
    }
  };

  // const addComment = () => {
  //   const comment = {
  //     id: "69asdasdasdasasd",
  //     username: "thuan",
  //     title: `${commentwriting}`,
  //   };
  //   setComments(comments.concat(comment));
  // };
  // const handleComment = () => {
  //   addComment();
  // };
  const addComment = async () => {
    const comment = {
      postid: `${detail?._id}`,
      username: `${detail?.comments?.username}`,
      comment: `${commentwriting}`,
      profile: `${detail?.comments?.profile}`,
    };

    await fetch(`http://localhost:8080/api/v1/post/comment/post`, {
      method: "PUT",
      headers: { "Content-Type": "application/Json", token: accessToken },
      body: JSON.stringify(comment),
    });
    setComments(comments.concat(comment));
  };
  const handleComment = () => {
    addComment();
  };

  const handleShow = () => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  console.log(user);

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[900],
        width: "95%",
        // height: "50vh",
        m: "auto",
        mt: "20px",
        borderRadius: "10px",
        flex: "1",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ml: "2px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", ml: "2px" }}>
            <Avatar src={`${user.profile}`} />
            <Typography sx={{ ml: "4px" }}>{user.username}</Typography>
          </Box>
          <Box>
            <IconButton>
              <MoreHorizIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
        <Typography sx={{ textAlign: "start", m: "5px ", fontSize: "14px" }}>
          {detail.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {detail.image !== "" ? (
            <Avatar
              src={`${detail.image}`}
              sx={{
                width: "500px",
                height: "450px",
                objectFit: "cover",
                borderRadius: "2px",
              }}
            />
          ) : detail.video !== "" ? (
            <video controls width="550" height="500">
              <source src={`${detail.video}`} type="video/mp4" />
            </video>
          ) : (
            ""
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", m: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: "2px",
              cursor: "pointer",
            }}
          >
            <IconButton onClick={handleLike}>
              {like}

              <Typography sx={{ ml: "5px" }}>
                {detail.like.length} Thích
              </Typography>
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              m: "0 8px",
              cursor: "pointer",
            }}
          >
            <IconButton onClick={handleShow}>
              <CommentIcon />
              <Typography sx={{ ml: "5px" }}>
                {detail.comments.length} Bình Luận
              </Typography>
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: "2px",
              ml: "240px",
              cursor: "pointer",
            }}
          >
            <IconButton>
              <ShareIcon />
              <Typography sx={{ ml: "5px" }}>Chia sẽ</Typography>
            </IconButton>
          </Box>
        </Box>

        {show === true ? (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mr: "2px" }}>
              <Avatar src={`${user.profile}`} />

              <InputBase
                onChange={(e) => setCommentwriting(e.target.value)}
                placeholder="Vui lòng viết bình luận"
                sx={{
                  ml: "10px",
                  width: "85%",
                  height: "100px",
                  borderColor: "1px solid #000000",
                  borderRadius: "4px",
                  "&:focus": {
                    borderColor: "#1877F2",
                  },
                }}
              />
              <Button
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  ml: "2px",
                }}
                onClick={handleComment}
              >
                Gửi
              </Button>
            </Box>
            {comments.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", ml: "2px" }}>
                  <Avatar />
                  <Box sx={{ ml: "5px", mt: "30px" }}>
                    <Typography variant="h5">{item.username}</Typography>

                    <Typography fontSize="12px" color="#aaa">
                      {item.title}
                    </Typography>
                    <Typography fontSize="12px" color="#aaa">
                      Thu hồi
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default ProfilePost;
