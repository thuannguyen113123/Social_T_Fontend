import {
  Avatar,
  Box,
  Typography,
  useTheme,
  Divider,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { tokens } from "./../theme.js";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { baseURL } from "../Urls.js";

const ProfileLeftbar = () => {
  //Tham số hai là lấy id
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);

  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const accesstoken = user.accessToken;

  const [follow, setUnFollow] = useState(
    user?.user?.Following.includes(id) ? "Hủy theo dõi" : "Theo dõi"
  );

  // const id = user.user._id;

  // const username = user.user.username;

  console.log(user);

  const [followingUser, setFollowingUser] = useState([]);

  const getFollowing = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/v1/post/following/${id}`
      );
      setFollowingUser(data.followingList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFollowing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/v1/user/post/user-details/${id}`
      );
      setUsers(data.others);
    } catch (error) {
      console.log(error);
      toast.error("Xảy ra lỗi khi nhận dữ liệu");
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let FollowCount = users?.Followers?.length;
  let FollowingCount = users?.Following?.length;

  console.log(users);

  //Xữ lý theo dõi
  const handleFollow = async () => {
    if (follow === "Theo dõi") {
      await fetch(`${baseURL}/api/v1/user/following/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/JSON", token: accesstoken },
        body: JSON.stringify({ user: `${user.other._id}` }),
      });
      setUnFollow("Hủy theo dõi");
    } else {
      await fetch(`${baseURL}/api/v1/user/following/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/JSON", token: accesstoken },
        body: JSON.stringify({ user: `${user.other._id}` }),
      });
      setUnFollow("Theo dõi");
    }
  };
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: colors.primary[900],
          width: "18pc",
          height: "50vh",
          mt: "20px",
          borderRadius: "20px",
          flex: "1",
          //   overflow: "hidden",
          //   overflowY: "scroll",
        }}
      >
        <Avatar
          sx={{
            width: "100%",
            height: "100px",
            borderRadius: "0px",
            objectFit: "cover",
            zIndex: "1",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: "-22px",
          }}
        >
          <Avatar
            src={users.profile}
            sx={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              ml: "10px",
              zIndex: "2",
            }}
          />
          <Box
            sx={{
              zIndex: "2",
              mt: "20px",
            }}
          >
            <Typography sx={{ ml: "5px" }}>{users.username}</Typography>
            <Typography sx={{ ml: "5px", fontSize: "12px" }}>
              Nhà báo
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            zIndex: "2",
            mt: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ ml: "10px" }}>Đang theo dõi</Typography>
          <Typography sx={{ mr: "10px" }}>{FollowingCount}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            zIndex: "2",
            mt: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ ml: "10px" }}>Theo dõi</Typography>
          <Typography sx={{ mr: "10px" }}> {FollowCount}</Typography>
        </Box>
        <Divider />

        <Box
          sx={{
            zIndex: "2",
            mt: "5px",
          }}
        >
          <Typography sx={{ textAlign: "center", fontWeight: "700" }}>
            Người dùng
          </Typography>
          <Typography sx={{ m: "5px 10px" }}>
            Tôi thà bị người khác coi thường còn hơn là được yêu thương bởi
            người không phải là tôi
          </Typography>
        </Box>
        {user.other._id !== id ? (
          <Button
            onClick={handleFollow}
            sx={{
              width: "100%",
              backgroundColor: colors.blueAccent[500],
              color: "inherit",
              mt: "20px",
            }}
          >
            {follow}
          </Button>
        ) : (
          <Button
            sx={{
              width: "100%",
              backgroundColor: colors.blueAccent[500],
              color: "inherit",
              mt: "20px",
            }}
          >
            Cập nhật
          </Button>
        )}
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
        <Typography
          variant="h4"
          sx={{ fontWeight: "700", textAlign: "center" }}
        >
          Danh sách bạn bè
        </Typography>
        <Box
          sx={{
            m: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>Đang theo dõi</Typography>
          <Typography sx={{ color: "#aaa" }}>Xem tất cả</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            // justifyContent: "space-between",
            m: "10px",
          }}
        >
          {followingUser.map((item) => (
            <Box
              component={Link}
              to={`/Profile/${item._id}`}
              sx={{ textDecoration: "none", ml: "5px" }}
              key={item._id}
            >
              <Avatar
                src={`${item.profile}`}
                sx={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
              <Typography textAlign="center" sx={{ color: "inherit" }}>
                {item.username}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileLeftbar;
