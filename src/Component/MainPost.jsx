import { Box, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { tokens } from "./../theme.js";
import ContentPost from "./ContentPost";
import Post from "./Post.jsx";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { baseURL } from "../Urls.js";

const MainPost = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [post, setPost] = useState([]);

  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  const accesstoken = user.accessToken;
  const id = user.other._id;

  const getPost = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/v1/user/follow/${id}`, {
        headers: {
          token: accesstoken,
        },
      });
      setPost(data.post);
    } catch (error) {
      console.log(error);
      toast.error("Xảy ra lỗi khi nhận dữ liệu");
    }
  };

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(post);
  return (
    <Box
      sx={{
        flex: 3,
      }}
    >
      <ContentPost />
      {post.map((item, index) => (
        <Post post={item} key={index} />
      ))}
    </Box>
  );
};

export default MainPost;
