import { Box, Typography, Avatar, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from "axios";
import { tokens } from "./../theme.js";
import Follow from "./Rightbar/Follow.jsx";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { baseURL } from "../Urls.js";

const ProfileRightbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [followersUser, setFollowersUser] = useState([]);

  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;

  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const inforSuggest = user?.other?._id;

  // const username = user.user.username;

  const getFollowers = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/v1/post/followers/${id}`
      );
      setFollowersUser(data.followersList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/v1/user/all-user/${inforSuggest}`
      );
      setUsers(data.filterUser);
    } catch (error) {
      console.log(error);
      // toast.error("Xảy ra lỗi khi nhận dữ liệu");
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: colors.primary[900],
          width: "20pc",
          height: "40vh",
          mt: "20px",
          borderRadius: "20px",
          flex: "1",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Lượt theo dõi
        </Typography>
        <Box>
          {followersUser.map((item) => (
            <Box
              key={item._id}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                ml: "10px",
              }}
            >
              <Avatar src={`${item.profile}`} />
              <Typography variant="p" ml="5px">
                {item.username}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: colors.primary[900],
          width: "20pc",
          height: "40vh",
          mt: "20px",
          borderRadius: "20px",
          flex: "1",
        }}
      >
        <Typography sx={{ textAlign: "center", fontSize: "18px" }}>
          Đề nghị dành cho bạn
        </Typography>
        <Box>
          {users.map((item) => (
            <Follow userdetails={item} key={item._id} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileRightbar;
