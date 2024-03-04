import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Avatar,
  Typography,
  InputBase,
  Button,
  Divider,
} from "@mui/material";
import { tokens } from "./../theme.js";
import axios from "axios";
import toast from "react-hot-toast";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/ShareSharp";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ProfileImage from "./Images/WIN_20230918_16_20_02_Pro.jpg";
import { useSelector } from "react-redux";
import { baseURL } from "../Urls.js";

import { Modal } from "antd";
import PostFormUpdate from "./PostFormUpdate";

const Post = ({ post }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const userDetails = useSelector((state) => state.user);
  let users = userDetails?.user;
  const [user, setUser] = useState([]);

  //Phần Modal cập nhật bài viết
  const [visible, setVisible] = useState(false);

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/v1/user/post/user-details/${post.user}`
      );
      setUser(data.others);
    } catch (error) {
      console.log(error);
      toast.error("Xảy ra lỗi khi nhận dữ liệu");
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userId = users.other._id;
  const accessToken = users.accessToken;

  const [like, setLike] = useState(
    post.like.includes(userId) ? (
      <ThumbUpIcon sx={{ color: "#1877F2" }} />
    ) : (
      <ThumbUpIcon />
    )
  );
  const [count, setCount] = useState(post.like.length);

  const [comments, setComments] = useState(post.comments);
  const [commentwriting, setCommentwriting] = useState("");

  //Hiển thị khung bình luận
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = async () => {
    if (like.type === ThumbUpIcon) {
      await fetch(`${baseURL}/api/v1/post/${post._id}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/Json", token: accessToken },
      });
      setLike(<ThumbUpAltIcon sx={{ color: "#1877F2" }} />);
      setCount(count + 1);
    } else {
      await fetch(`${baseURL}/api/v1/post/${post._id}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/Json", token: accessToken },
      });
      setLike(<ThumbUpIcon />);
      setCount(count - 1);
    }
  };

  const addComment = async () => {
    const comment = {
      postid: `${post._id}`,
      username: `${users.other.username}`,
      comment: `${commentwriting}`,
      profile: `${users?.other?.profile}`,
    };

    await fetch(`${baseURL}/api/v1/post/comment/post`, {
      method: "PUT",
      headers: { "Content-Type": "application/Json", token: accessToken },
      body: JSON.stringify(comment),
    });

    setComments(comments.concat(comment));
    setCommentwriting("");
  };

  const handleComment = () => {
    addComment();
  };
  const deleteComment = async (postId, commentId) => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/post/comment/delete/${postId}/${commentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json", token: accessToken },
        }
      );

      if (response.ok) {
        // Cập nhật trạng thái bình luận sau khi xóa thành công
        setComments(comments.filter((comment) => comment._id !== commentId));
      } else {
        // Xử lý lỗi
        console.error("Xóa bình luận không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi xóa bình luận", error);
    }
  };

  // Ví dụ cách sử dụng:
  const handleDeleteComment = (postId, commentId) => {
    deleteComment(postId, commentId);
  };

  const deletePost = async () => {
    await fetch(`${baseURL}/api/v1/post/delete-post/${post._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/Json", token: accessToken },
    });
    window.location.reload(true);
  };
  const handleDeletePost = () => {
    deletePost();
  };

  const handleShow = () => {
    if (show === false) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const handleShowMenu = () => {
    if (showMenu === false) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

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
            {user.profile === "" ? (
              <Avatar src={`${ProfileImage}`} />
            ) : (
              <Avatar src={`${user.profile}`} />
            )}
            <Typography sx={{ ml: "4px" }}>{user.username}</Typography>
          </Box>
          <Box
            sx={{
              position: "relative",
            }}
          >
            <IconButton onClick={handleShowMenu}>
              <MoreHorizIcon fontSize="large" />
            </IconButton>
            {showMenu === true ? (
              <Box
                sx={{
                  width: "120px",
                  // height: "200px",
                  position: "absolute",
                  zIndex: 2,
                  top: "30px",
                  left: "-40px",

                  backgroundColor: "#9c9c9c",
                }}
              >
                {/* <Typography>Cập nhật</Typography> */}
                <Box
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    color: "inherit",
                    cursor: "pointer",
                    padding: "5px",
                  }}
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  Chỉnh sửa bài viết
                  <Modal
                    footer={null}
                    onCancel={() => setVisible(false)}
                    open={visible}
                  >
                    <PostFormUpdate
                      post={post}
                      onClose={() => {
                        console.log("PostFormUpdate is closing");
                        setVisible(false);
                      }}
                    />
                  </Modal>
                </Box>
                <Divider />
                <Box
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    color: "inherit",
                    cursor: "pointer",
                    padding: "5px",
                  }}
                  onClick={handleDeletePost}
                >
                  Xóa
                </Box>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Box>
        <Typography sx={{ textAlign: "start", m: "5px ", fontSize: "14px" }}>
          {post.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {post.image !== "" ? (
            <Avatar
              src={`${post.image}`}
              sx={{
                width: "500px",
                height: "450px",
                objectFit: "cover",
                borderRadius: "2px",
              }}
            />
          ) : post.video !== "" ? (
            <video controls width="550" height="500">
              <source src={`${post.video}`} type="video/mp4" />
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

              <Typography sx={{ ml: "5px" }}>{count} Thích</Typography>
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
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  ml: "5px",
                }}
              >
                {comments.length} Bình Luận
              </Typography>
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: "5px",
              ml: "240px",
              cursor: "pointer",
            }}
          >
            <IconButton>
              <ShareIcon />
              <Typography sx={{ whiteSpace: "nowrap" }}>Chia sẽ</Typography>
            </IconButton>
          </Box>
        </Box>

        {show === true ? (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mr: "2px" }}>
              <Avatar src={`${users.other.profile}`} />

              <InputBase
                onChange={(e) => setCommentwriting(e.target.value)}
                value={commentwriting}
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", ml: "2px" }}
                >
                  <Avatar src={`${item.profile}`} />
                  <Box sx={{ ml: "5px", mt: "30px" }}>
                    <Typography variant="h5">{item.username}</Typography>

                    <Typography fontSize="12px" color="#aaa">
                      {item.comment}
                    </Typography>
                    <Typography fontSize="12px" color="#aaa">
                      <IconButton
                        sx={{ fontSize: "12px" }}
                        onClick={() => handleDeleteComment(post._id, item._id)}
                      >
                        Thu hồi
                      </IconButton>
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

export default Post;
