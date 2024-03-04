import React, { useState, useEffect } from "react";
import { useTheme, Button, Box, InputBase } from "@mui/material";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { tokens } from "../theme";
import app from "../Filebase.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { baseURL } from "../Urls";

const PostFormUpdate = ({ post, onClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const userDetails = useSelector((state) => state.user);
  let users = userDetails?.user;
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/v1/user/post/user-details/${post.user}`
      );
      setUser(data.others);
    } catch (error) {
      console.log(error);
      toast.error("Xảy ra lỗi khi nhận dữ liệu");
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const accessToken = users.accessToken;

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(post.title || "");
  const [Video, setVideo] = useState(null);
  const [imagePre, setImagePre] = useState(null);
  const [VideoPre, setVideoPre] = useState(null);

  const center = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  useEffect(() => {
    // Hiển thị ảnh hoặc video hiện tại khi mở form
    setImagePre(post.image || null);
    setVideoPre(post.video || null);
  }, [post.image, post.video]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Title:", title);
      console.log("File:", file);
      console.log("Video:", Video);

      if (file !== null) {
        const fileName = new Date().getTime() + file?.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Tải lên " + progress + "% đã hoàn thành");
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
            console.error("Lỗi khi tải lên không thành công", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Cập nhật chỉ tiêu đề và hình ảnh
            updatePost({
              title: title,
              image: downloadURL,
              video: "",
            });
          }
        );
      } else if (Video !== null) {
        const fileName = new Date().getTime() + Video?.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, Video);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Tải lên " + progress + "% đã hoàn thành");
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
            console.error("Lỗi khi tải lên không thành công", error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Cập nhật chỉ tiêu đề và video
            updatePost({
              title: title,
              video: downloadURL,
              image: "",
            });
          }
        );
      } else {
        // Trường hợp không có ảnh hoặc video, chỉ cập nhật tiêu đề
        updatePost({
          title: title,
          video: "",
          image: "",
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết", error);
    }
  };

  const updatePost = async (postData) => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/post/update-post/${post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/JSON",
            token: accessToken,
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        window.location.reload(true);
        console.log(data);
      } else {
        console.error("Có lỗi khi cập nhật bài viết");
      }
    } catch (error) {
      console.error("Lỗi trong quá trình gửi yêu cầu cập nhật", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={center}>
      <InputBase
        type="text"
        placeholder="Tiêu đề bài viết."
        value={title}
        sx={{
          width: "29pc",
          ml: "10px",
          mt: "20px",
          height: "10vh",
          color: "inherit",
          border: "1px solid #333",
          outline: "1px solid #333",
          borderRadius: "5px",
        }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Box sx={{ display: "flex" }}>
        <InputBase
          type="file"
          name="file"
          id="file"
          style={{}}
          onChange={(e) => {
            setFile(e.target.files[0]);
            const file = e.target.files[0];
            setImagePre(URL.createObjectURL(file));
          }}
        />
        {imagePre && (
          <img
            src={imagePre}
            alt="Selected"
            style={{ maxWidth: "100%", maxHeight: "150px", marginTop: "10px" }}
          />
        )}
      </Box>
      <Box sx={{ display: "flex" }}>
        <InputBase
          type="file"
          name="video"
          id="video"
          onChange={(e) => {
            setVideo(e.target.files[0]);
            const video = e.target.files[0];
            setVideoPre(URL.createObjectURL(video));
          }}
        />
        {VideoPre && (
          <video
            src={VideoPre}
            width="400px"
            height="250px"
            controls
            style={{ marginTop: "10px" }}
          >
            <source src={VideoPre} type="video/mp4" />
          </video>
        )}
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Button
          type="submit"
          sx={{ backgroundColor: colors.greenAccent[600], color: "inherit" }}
        >
          Xác nhận
        </Button>
        <Button onClick={() => onClose()} sx={{ mt: 2, color: "inherit" }}>
          Hủy
        </Button>
      </Box>
    </form>
  );
};

export default PostFormUpdate;
