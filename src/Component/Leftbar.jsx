import { Avatar, Box, Typography, useTheme } from "@mui/material";

import axios from "axios";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";

import { tokens } from "./../theme.js";
import { useSelector } from "react-redux";
import { baseURL } from "../Urls.js";

const Leftbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [post, setPost] = useState([]);
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user?.other?._id;

  const accesstoken = user.accessToken;

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
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: colors.primary[900],
          width: "18pc",
          height: "60vh",
          mt: "20px",
          borderRadius: "20px",
          flex: "1",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Typography>Thông báo</Typography>
          <Typography>xem tất cả</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src="https://sohanews.sohacdn.com/2017/photo-1-1514222367538.jpg" />
          <Typography
            sx={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: "13px",
              textAlign: "start",
              width: "120px",
            }}
          >
            Thuận đã thích bài đăng của bạn
          </Typography>

          <Avatar
            src=""
            sx={{
              width: "35px",
              height: "35px",
              borderRadius: "0",
              marginLeft: "40px",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src="https://sohanews.sohacdn.com/2017/photo-1-1514222367538.jpg" />
          <Typography
            sx={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: "13px",
              textAlign: "start",
              width: "120px",
              mt: "5px",
            }}
          >
            Thuận đã thích bài đăng của bạn
          </Typography>

          <Avatar
            src=""
            sx={{
              width: "35px",
              height: "35px",
              borderRadius: "0",
              marginLeft: "40px",
            }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src="https://sohanews.sohacdn.com/2017/photo-1-1514222367538.jpg" />
          <Typography
            sx={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: "13px",
              textAlign: "start",
              width: "120px",
              mt: "5px",
            }}
          >
            Thuận đã thích bài đăng của bạn
          </Typography>

          <Avatar
            src=""
            sx={{
              width: "35px",
              height: "35px",
              borderRadius: "0",
              marginLeft: "40px",
            }}
          />
        </Box>{" "}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src="https://sohanews.sohacdn.com/2017/photo-1-1514222367538.jpg" />
          <Typography
            sx={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: "13px",
              textAlign: "start",
              width: "120px",
              mt: "5px",
            }}
          >
            Thuận đã thích bài đăng của bạn
          </Typography>

          <Avatar
            src=""
            sx={{
              width: "35px",
              height: "35px",
              borderRadius: "0",
              marginLeft: "40px",
            }}
          />
        </Box>{" "}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src="https://sohanews.sohacdn.com/2017/photo-1-1514222367538.jpg" />
          <Typography
            sx={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: "13px",
              textAlign: "start",
              width: "120px",
              mt: "5px",
            }}
          >
            Thuận đã thích bài đăng của bạn
          </Typography>

          <Avatar
            src=""
            sx={{
              borderRadius: "50%",
              marginLeft: "40px",
            }}
          />
        </Box>{" "}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src="https://sohanews.sohacdn.com/2017/photo-1-1514222367538.jpg" />
          <Typography
            sx={{
              marginLeft: "5px",
              color: "#aaa",
              fontSize: "13px",
              textAlign: "start",
              width: "120px",
              mt: "5px",
            }}
          >
            Thuận đã thích bài đăng của bạn
          </Typography>

          <Avatar
            src=""
            sx={{
              width: "35px",
              height: "35px",
              borderRadius: "0",
              marginLeft: "40px",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: colors.primary[900],
          width: "18pc",
          height: "60vh",
          mt: "20px",
          borderRadius: "20px",

          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Typography>Khám phá</Typography>
          <Typography>xem tất cả</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          {post.map((item) => [
            item.image === "" ? (
              ""
            ) : (
              <Avatar
                key={item._id}
                src={`${item.image}`}
                sx={{
                  width: "86px",
                  height: "140px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  m: "2px",
                }}
              />
            ),
          ])}
        </Box>
      </Box>
    </Box>
  );
};

export default Leftbar;
