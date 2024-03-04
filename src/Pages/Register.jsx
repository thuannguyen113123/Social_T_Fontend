import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  useTheme,
  InputBase,
} from "@mui/material";
import Logo from "../Component/Logo";
import { tokens } from "./../theme.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { signup } from "../Component/ReduxContainer/apiCall.js";
import app from "../Filebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import toast from "react-hot-toast";
const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const user = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const userDetails = user.user;

  const navigator = useNavigate();

  // console.log(userDetails?.Status);

  const handleRegister = (e) => {
    e.preventDefault();

    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(StorageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Tải lên " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Tải lên bị tạm dừng");
            break;
          case "running":
            console.log("Đang tải lên");
            break;
          default:
            console.log("Trạng thái tải lên không xác định");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          signup(dispatch, {
            email,
            password,
            username,
            phonenumber,
            profile: downloadURL,
          })
            .then((res) => {
              console.log(res.data); // In ra dữ liệu trả về từ server
              toast.success("Bài viết tải lên thành công");
              window.location.reload(true);
            })
            .catch((error) => {
              console.log(error); // In ra thông tin lỗi (nếu có)
            });
        });
      }
    );
  };

  // console.log(userDetails);

  if (userDetails?.Status === "Pending") {
    navigator("/verify/email");
  }
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
            Tạo tài khoản mới
          </Typography>
          <Box
            sx={{
              width: "50%",
            }}
          >
            <InputBase
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <TextField
              type="text"
              placeholder="Tên người dùng"
              sx={{
                display: "flex",
                borderRadius: "10px",
                border: "none",
                mt: "10px",
              }}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              type="text"
              placeholder="Email"
              sx={{
                display: "flex",
                borderRadius: "10px",
                border: "none",
                mt: "10px",
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              placeholder="Mật khẩu"
              sx={{
                display: "flex",
                borderRadius: "10px",
                border: "none",
                mt: "10px",
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              type="number"
              placeholder="Số điện thoại"
              sx={{
                display: "flex",
                borderRadius: "10px",
                border: "none",
                mt: "10px",
              }}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </Box>
          <Button
            sx={{
              mt: "10px",
              width: "50%",
              backgroundColor: colors.blueAccent[500],
              color: "inherit",
            }}
            onClick={handleRegister}
          >
            Đăng ký
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
