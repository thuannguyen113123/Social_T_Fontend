import { Avatar, Box, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";

import { tokens } from "./../theme.js";
import ContentPost from "./ContentPost";
import ProfilePost from "./ProfilePost/ProfilePost";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { baseURL } from "../Urls.js";

const ProfileMainPost = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let location = useLocation();
  let id = location.pathname.split("/")[2];

  const [post, setPost] = useState([]);

  const getProfilePost = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/v1/post/get-post/${id}`);
      console.log(data);
      setPost(data.myPost);
    } catch (error) {
      console.log(error);
      toast.error("Xảy ra lỗi khi nhận dữ liệu");
    }
  };
  useEffect(() => {
    getProfilePost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box
      sx={{
        flex: 3,
        mt: "10px",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Avatar
          sx={{
            width: "96%",
            borderRadius: "5px",
            height: "20vh",
            objectFit: "cover",
            m: "10px",
          }}
        />
        <Typography
          sx={{ position: "absolute", bottom: "5px", left: "15px" }}
          variant="h3"
        >
          Trang của bạn
        </Typography>
      </Box>
      <ContentPost />
      {post.map((item) => (
        <ProfilePost key={item._id} detail={item} />
      ))}
    </Box>
  );
};

export default ProfileMainPost;
