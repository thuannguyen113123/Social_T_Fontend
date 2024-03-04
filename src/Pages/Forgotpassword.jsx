import { Box, InputBase, Stack, Typography, Button } from "@mui/material";

import React, { useState } from "react";
import { baseURL } from "../Urls";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();
    await fetch(`${baseURL}/api/v1/user/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ email: email }),
    })
      .then(() => {
        alert("Chúng tôi đã gữi mã xác nhận cho email của bạn");
      })
      .catch(() => {
        alert("Không xử lý được");
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
        <Typography>Nhập email của bạn</Typography>
        <Stack sx={{ flexDirection: "column" }}>
          <InputBase
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
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
              onClick={handleClick}
            >
              Gữi
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Forgotpassword;
