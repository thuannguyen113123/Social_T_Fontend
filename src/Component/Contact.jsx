import React, { useState, useEffect } from "react";
import { Box, InputBase, IconButton, Avatar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import ChatContainer from "./ChatContainer";
import { baseURL } from "../Urls.js";

const Contact = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  console.log(user);

  let id = user.other._id;
  console.log(typeof id);

  const accesstoken = user.accessToken;
  console.log(accesstoken);
  const [users, setUsers] = useState();

  const [currentChatUser, setCurrentChatUser] = useState("");
  console.log(`${baseURL}/api/v1/post/following/${id}`);
  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/v1/post/following/${id}`,
        {
          headers: {
            token: accesstoken,
          },
        }
      );
      console.log(data);
      setUsers(data.followingList);
    } catch (error) {
      console.log(error);
      toast.error("Xảy ra lỗi khi nhận dữ liệu");
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(users);

  console.log(currentChatUser);
  const handleUser = (e) => {
    setCurrentChatUser(e);
  };
  return (
    <Box
      sx={{
        flex: "1",
        mt: "5px",
        // height: "100vh",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box sx={{ overflow: "hidden", overflowY: "scroll" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                width: "300px",
                height: "30px",
                borderRadius: "14px",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                boxShadow: "0 1px 3.125rem 0 rgba(0,0,0,0.4)",
                color: "#000",
              }}
            >
              <InputBase
                type="search"
                placeholder="Tìm kiếm bạn bè"
                inputProps={{ "aria-label": "search" }}
                sx={{
                  flex: 1,
                  // border: "1px solid #ccc",
                  borderRadius: "4px",
                  color: "inherit",
                  // padding: "8px",
                  // fontSize: "14px",
                  width: "90%",
                  height: "100%",
                  border: "none",
                  outline: "none",
                  padding: "10px 10px",
                  fontSize: "18px",
                  backgroundColor: "transparent",
                }}
              />

              <IconButton
                sx={{
                  fontSize: "18px",
                  paddingLeft: "10px",
                  color: "red",
                }}
                type="submit"
              >
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>

          {users?.map((item) => (
            <Box>
              {item._id !== id ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#b4b4b4",
                    borderRadius: "5px",
                    m: "5px",
                    height: "60px",
                  }}
                  onClick={(e) => handleUser(item)}
                >
                  <Avatar src={item.profile} />
                  <Box sx={{ ml: "5px" }}>
                    <Typography sx={{ color: "inherit" }}>
                      {item.username}
                    </Typography>
                    <Typography>Mở tin nhắn</Typography>
                  </Box>
                </Box>
              ) : (
                ""
              )}
            </Box>
          ))}
        </Box>
        {currentChatUser !== "" ? (
          <ChatContainer currentChatUser={currentChatUser} />
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h1"> Mở tin nhắn</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Contact;
