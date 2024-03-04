import React from "react";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  useTheme,
  Avatar,
  Button,
} from "@mui/material";
import { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";

import { Link } from "react-router-dom";

import { ColorModeContext } from "../theme.js";
import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "./ReduxContainer/userReducer.js";

const Navbar = () => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user?.other?._id;
  console.log(id);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Box
        sx={{
          flex: "1",
          p: "4px 0",
          display: "flex",
          width: "100%",
          margin: "auto",
          justifyContent: "space-between",
          backgroundColor: "inherit",
          borderBottomLeftRadius: "13px",
          borderBottomRightRadius: "13px",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Box
          component={Link}
          to={"/"}
          sx={{ flex: "0.2", textDecoration: "none", ml: "5px" }}
        >
          <Logo />
        </Box>
        <Box
          sx={{
            width: "400px",
            height: "50px",
            borderRadius: "14px",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            boxShadow: "0 1px 3.125rem 0 rgba(0,0,0,0.4)",
            color: "#000",
            ml: "200px",
          }}
        >
          <InputBase
            type="search"
            placeholder="Search"
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: "0.22",
          }}
        >
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton component={Link} to="/chat">
            <MessageIcon />
          </IconButton>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <Box
            sx={{
              padding: "0 4px",
            }}
          >
            <Avatar src={`${user?.other?.profile}`} />
          </Box>
          <Typography
            component={Link}
            to={`/Profile/${id}`}
            sx={{
              textDecoration: "none",
              color: "inherit",
              whiteSpace: "nowrap",
            }}
          >
            {user?.other?.username}
          </Typography>
          <Button onClick={handleLogout}>
            <Typography m="0 20px" sx={{ color: "red", whiteSpace: "nowrap" }}>
              Đăng xuất
            </Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
