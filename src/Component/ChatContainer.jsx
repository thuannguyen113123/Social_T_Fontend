import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  InputBase,
  useTheme,
  Button,
} from "@mui/material";
import Send from "@mui/icons-material/Send";
import { tokens } from "../theme";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { baseURL } from "../Urls.js";

const ChatContainer = ({ currentChatUser }) => {
  console.log(currentChatUser);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;

  let id = user.other._id;
  const [message, setMessage] = useState();
  //Lưu nội dung viết tin nhắn
  const [inputMessage, setInputMessage] = useState("");

  const accesstoken = user.accessToken;

  const srcollRef = useRef();

  const socket = useRef();

  const [arrivalMessage, setArrivalMessage] = useState(null);
  console.log(
    `${baseURL}/api/v1/post/get/chat/msg/${id}/${currentChatUser._id}`
  );
  const getMessage = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/v1/post/get/chat/msg/${id}/${currentChatUser._id}`,
        {
          headers: {
            token: accesstoken,
          },
        }
      );
      console.log(id);
      console.log(currentChatUser._id);
      setMessage(data.allMessage);
    } catch (error) {
      console.log(error);
      toast.error("Xảy ra lỗi khi nhận dữ liệu");
    }
  };
  console.log(message);
  useEffect(() => {
    if (currentChatUser !== "") {
      socket.current = io(`${baseURL}`);
      socket.current.emit("addUser", id);
    }
  }, [id]);

  console.log(socket);

  useEffect(() => {
    getMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChatUser._id]);

  console.log(currentChatUser._id);
  console.log(message);

  //Gữi tin nhắn
  const sendMessage = () => {
    const messages = {
      myself: true,
      message: inputMessage,
    };
    socket.current.emit("send-msg", {
      to: currentChatUser._id,
      from: id,
      message: inputMessage,
    });
    fetch(`${baseURL}/api/v1/post/msg`, {
      method: "POST",
      headers: { "Content-Type": "application/Json", token: accesstoken },
      body: JSON.stringify({
        from: id,
        to: currentChatUser._id,
        message: inputMessage,
      }),
    });
    setMessage(message.concat(messages));
  };

  useEffect(() => {
    srcollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        console.log(msg);
        setArrivalMessage({ myself: false, message: msg });
      });
    }
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage && setMessage((pre) => [...pre, arrivalMessage]);
  }, [arrivalMessage]);
  return (
    <Box sx={{ flex: "3" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#b4b4b4",
          borderRadius: "5px",
          m: "5px",
          height: "60px",
        }}
      >
        <Avatar
          src={`${currentChatUser?.profile}`}
          sx={{ objectFit: "cover" }}
        />

        <Typography sx={{ color: "inherit", ml: "5px" }}>
          {currentChatUser?.username}
        </Typography>
      </Box>

      <Box sx={{ height: "70vh", overflow: "hidden", overflowY: "scroll" }}>
        {message?.map((item, index) => (
          <Box ref={srcollRef}>
            {item.myself === false ? (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#b4b4b4",
                  borderRadius: "5px",
                  m: "5px",
                  width: "40%",
                  height: "60px",
                }}
              >
                <Avatar
                  src={`${currentChatUser?.profile}`}
                  sx={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <Typography sx={{ color: "inherit", ml: "5px" }}>
                  {item?.message}
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#b4b4b4",
                    borderRadius: "5px",
                    m: "5px",

                    width: "40%",
                    height: "60px",
                  }}
                >
                  {/* <Avatar
                    src={`${item?.profile}`}
                    sx={{ width: "40px", height: "40px", objectFit: "cover" }}
                  /> */}
                  <Typography sx={{ color: "inherit", ml: "5px" }}>
                    {item?.message}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          backgroundColor: "#b4b4b4",
          display: "flex",
          alignItems: "center",
        }}
      >
        <InputBase
          placeholder="Viết tin nhắn của bạn"
          type="text"
          sx={{
            width: "90%",
            ml: "10px",
            mt: "10px",
            mb: "10px",
            height: "6vh",
            borderRadius: "5px",
          }}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button
          sx={{
            backgroundColor: colors.greenAccent[500],
            ml: "5px",
            borderRadius: "5px",
          }}
          onClick={sendMessage}
        >
          <Send />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatContainer;
