import React from "react";
import { Box } from "@mui/material";

import Navbar from "../Component/Navbar";
import Leftbar from "../Component/Leftbar";
import Rightbar from "../Component/Rightbar/Rightbar";
import MainPost from "../Component/MainPost";
import { useSelector } from "react-redux";

const Home = () => {
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
        <Leftbar />
        <MainPost />
        <Rightbar />
      </Box>
    </Box>
  );
};

export default Home;
