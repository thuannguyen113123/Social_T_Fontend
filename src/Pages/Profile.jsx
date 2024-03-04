import React from "react";
import Navbar from "../Component/Navbar";
import { Box } from "@mui/material";
import ProfileLeftbar from "../Component/ProfileLeftbar";
import ProfileRightbar from "../Component/ProfileRightbar";
import ProfileMainPost from "../Component/ProfileMainPost";
import { useSelector } from "react-redux";

const Profile = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  console.log(user);
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          width: "80%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ProfileLeftbar />
        <ProfileMainPost />
        <ProfileRightbar />
      </Box>
    </Box>
  );
};

export default Profile;
