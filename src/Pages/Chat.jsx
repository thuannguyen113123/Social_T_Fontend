import React from "react";
import { Box } from "@mui/material";

// import ChatContainer from "../Component/ChatContainer";
import Contact from "../Component/Contact";
import Navbar from "../Component/Navbar";

const Chat = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Contact />
        {/* <ChatContainer /> */}
      </Box>
    </>
  );
};

export default Chat;
