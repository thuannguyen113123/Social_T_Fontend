import {
  Box,
  IconButton,
  useTheme,
  Avatar,
  InputBase,
  Button,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import VideoIcon from "@mui/icons-material/VideoFile";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import app from "../Filebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { tokens } from "./../theme.js";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { baseURL } from "../Urls.js";

const ContentPost = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  // let id = user?.user?._id;

  const accessToken = user.accessToken;

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [Video, setVideo] = useState(null);
  //Hiện ảnh video lên khi chọn
  const [imagePre, setImagePre] = useState(null);
  const [VideoPre, setVideoPre] = useState(null);

  const handlePost = async (e) => {
    e.preventDefault();
    if (file !== null) {
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
            fetch(`${baseURL}/api/v1/post/user/post`, {
              method: "POST",
              headers: {
                "Content-Type": "application/JSON",
                token: accessToken,
              },
              body: JSON.stringify({
                title: title,
                image: downloadURL,
                video: "",
              }),
            }).then((data) => {
              toast.success("Bài viết tải lên thành công");
              window.location.reload(true);
            });
          });
        }
      );
    } else if (Video !== null) {
      const fileName = new Date().getTime() + Video?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(StorageRef, Video);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
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
            fetch(`${baseURL}/api/v1/post/user/post`, {
              method: "POST",
              headers: {
                "Content-Type": "application/JSON",
                token: accessToken,
              },
              body: JSON.stringify({
                title: title,
                video: downloadURL,
                image: "",
              }),
            }).then((data) => {
              toast.success("Bài viết tải lên thành công");
              window.location.reload(true);
            });
          });
        }
      );
    } else {
      fetch(`${baseURL}/api/v1/post/user/post`, {
        method: "POST",
        headers: { "Content-Type": "application/JSON", token: accessToken },
        body: JSON.stringify({ title: title, video: "", image: "" }),
      }).then((data) => {
        toast.success("Bài viết tải lên thành công");
        window.location.reload(true);
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[900],
        width: "95%",

        m: "auto",
        mt: "20px",
        borderRadius: "10px",
        flex: "1",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: "10px",
        }}
      >
        <Avatar
          src={`${user.other.profile}`}
          sx={{
            width: "40px",
            height: "40px",
            ml: "10px",
          }}
        />
        <InputBase
          type="text"
          placeholder="Viết cảm nghĩ của bạn vào đây."
          sx={{
            width: "29pc",
            ml: "10px",
            mt: "5px",
            height: "10vh",
            border: "none",
            outline: "none",
          }}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {imagePre !== null ? (
          <Avatar
            src={imagePre}
            sx={{
              width: "400px",
              height: "250px",
              objectFit: "cover",
              borderRadius: "1px",
            }}
          />
        ) : VideoPre !== null ? (
          <video width="400px" height="250px" controls>
            <source src={VideoPre} type="video/mp4" />
          </video>
        ) : (
          ""
        )}
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", ml: "10px" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <InputLabel htmlFor="file">
              <ImageIcon sx={{ ml: "5px" }} />

              <InputBase
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => [
                  setFile(e.target.files[0]),
                  setImagePre(URL.createObjectURL(e.target.files[0])),
                ]}
              />
            </InputLabel>
          </IconButton>
          <IconButton>
            <EmojiEmotionsIcon />
          </IconButton>
          <IconButton>
            <InputLabel htmlFor="video">
              <VideoIcon sx={{ mr: "5px" }} />

              <InputBase
                type="file"
                name="video"
                id="video"
                style={{ display: "none" }}
                onChange={(e) => [
                  setVideo(e.target.files[0]),
                  setVideoPre(URL.createObjectURL(e.target.files[0])),
                ]}
              />
            </InputLabel>
          </IconButton>
        </Box>
        <Box
          sx={{
            mr: "10px",
          }}
        >
          <Button
            size="large"
            sx={{
              backgroundColor: colors.greenAccent[500],
            }}
            onClick={handlePost}
          >
            Đăng Bài
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ContentPost;
