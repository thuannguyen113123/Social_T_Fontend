import React, { useState } from "react";
import { Box, InputBase, Stack, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { baseURL } from "../Urls";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const location = useLocation();
  const code = location.search.split("?")[1];
  console.log(password);
  const handleClick = async (e) => {
    e.preventDefault();
    await fetch(`${baseURL}/api/v1/user/reset-password?${code}`, {
      method: "PUT",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ password: password }),
    }).then((data) => {
      alert("Cập nhật mật khẩu thành công");
    });
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
        <Typography>Nhập mật khẩu mới của bạn</Typography>
        <Stack sx={{ flexDirection: "column" }}>
          <InputBase
            onChange={(e) => setPassword(e.target.value)}
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
              size="small"
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
              onClick={handleClick}
            >
              Đặt mật khẩu
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ResetPassword;
