import React, { useState } from "react";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseURL } from "../../Urls.js";
import { toast } from "react-hot-toast";

const Follow = ({ userdetails }) => {
  const [follow, setFollow] = useState(false);

  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;

  const id = user.other._id;

  const accessToken = user?.accessToken;
  const handleFollow = async () => {
    await fetch(`${baseURL}/api/v1/user/following/${userdetails._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/JSON", token: accessToken },
      body: JSON.stringify({ user: `${id}` }),
    });
    setFollow((prevFollow) => !prevFollow);
    toast.success("Theo dõi người dùng thành công");
  };

  return (
    <Box
      // key={userdetails._id}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: "5px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={userdetails.profile}
          alt={userdetails.username}
          sx={{
            width: "40px",
            height: "40px",
            ml: "10px",
          }}
        />
        <Box
          component={Link}
          to={`/Profile/${userdetails._id}`}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <Typography>{userdetails.username}</Typography>
          <Typography
            variant="p"
            sx={{ textAlign: "start", color: "#aaa", fontSize: "10px" }}
          >
            Đề nghị dành cho bạn
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={handleFollow}>
        <PersonAddIcon
          sx={{
            width: "20px",
            height: "20px",
            color: follow ? "#1877F2" : undefined,
          }}
        />
      </IconButton>
    </Box>
  );
};

export default Follow;
