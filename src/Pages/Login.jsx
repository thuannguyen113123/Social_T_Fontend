import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../Component/ReduxContainer/apiCall.js";
import Logo from "../Component/Logo";
import { tokens } from "./../theme.js";

const Login = () => {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <Box
      sx={{
        backgroundColor: colors.primary[900],

        height: "100vh",
      }}
    >
      <Grid
        container
        sx={{
          height: "100%",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Logo />

          <Typography variant="h4">
            TSocial Giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống
            của bạn.
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3" fontWeight="700">
            Đăng nhập
          </Typography>
          <Box
            sx={{
              width: "50%",
            }}
          >
            <TextField
              type="text"
              placeholder="Email"
              id="email"
              sx={{
                display: "flex",
                borderRadius: "10px",
                border: "none",
                mt: "10px",
              }}
              onChange={(e) => setemail(e.target.value)}
            />
            <TextField
              type="password"
              placeholder="Mật khẩu"
              id="password"
              sx={{
                display: "flex",
                borderRadius: "10px",
                border: "none",
                mt: "10px",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Button
            sx={{
              mt: "10px",
              width: "50%",
              backgroundColor: colors.blueAccent[500],
              color: "inherit",
            }}
            onClick={handleClick}
          >
            Đăng nhập
          </Button>
          {/* <Typography component={Link} to="/register">
            Quên mật khẩu
          </Typography> */}
          <Typography
            component={RouterLink}
            to="/forgot-password"
            sx={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Quên mật khẩu
          </Typography>
          <Typography
            component={RouterLink}
            to="/register"
            sx={{
              color: "white",
              textDecoration: "none",
            }}
          >
            Tạo mật khẩu mới
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
