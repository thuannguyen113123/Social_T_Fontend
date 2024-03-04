import React, { useState } from "react";
import { Box, InputBase, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VerifyEmail } from "../Component/ReduxContainer/apiCall.js";

const Verifyemail = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [OTP, setOTP] = useState("");

  const userDetails = user.user;
  const id = userDetails?.user;

  const handleOTP = (e) => {
    e.preventDefault();
    VerifyEmail(dispatch, { OTP: OTP, user: id });
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "25%",
          height: "25%",
          padding: "20px",
          margin: "auto",
          borderRadius: "10px",
          backgroundColor: "black",
        }}
      >
        <Typography>Nhập mã OTP</Typography>
        <Stack sx={{ flexDirection: "column" }}>
          <InputBase
            onChange={(e) => setOTP(e.target.value)}
            type="password"
            placeholder="Mật khẩu"
            sx={{
              outline: "auto",
              flex: 1,
              minWidth: "80px",
              margin: "10px 0px",
              padding: "10px",
              borderRadius: "10px",
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              size="large"
              sx={{
                width: "40%",
                border: "none",
                padding: "10px 20px",
                backgroundColor: "white",
                color: "black",
                borderRadius: "10px",
                margin: "20px 0px",
                cursor: "pointer",
              }}
              onClick={handleOTP}
              //   onClick={handleClick}
            >
              Xác thực
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Verifyemail;
