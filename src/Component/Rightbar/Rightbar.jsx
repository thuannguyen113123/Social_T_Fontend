import { Box, Typography, Avatar, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { tokens } from "../../theme.js";
import Follow from "./Follow.jsx";
import { useSelector } from "react-redux";
import { baseURL } from "../../Urls.js";

const Rightbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);

  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;

  const id = user?.other?._id;

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/v1/user/all-user/${id}`);
      setUsers(data.filterUser);
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
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: colors.primary[900],
          width: "20pc",
          height: "40vh",
          mt: "20px",
          borderRadius: "20px",
          flex: "1",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: "10px",
            padding: "5px",
          }}
        >
          <Avatar
            src="http://bizweb.dktcdn.net/100/060/439/files/poster-quang-cao-sua-vinamilk-07.jpg?v=1470526115254"
            sx={{
              width: "130px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
          <Box>
            <Typography
              sx={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-16px",
              }}
            >
              Chương Trình quảng cáo
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: "10px",
            padding: "5px",
          }}
        >
          <Avatar
            src="http://bizweb.dktcdn.net/100/060/439/files/poster-quang-cao-sua-vinamilk-07.jpg?v=1470526115254"
            sx={{
              width: "130px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
          <Box>
            <Typography
              sx={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-16px",
              }}
            >
              Chương Trình quảng cáo
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: "10px",
            padding: "5px",
          }}
        >
          <Avatar
            src="http://bizweb.dktcdn.net/100/060/439/files/poster-quang-cao-sua-vinamilk-07.jpg?v=1470526115254"
            sx={{
              width: "130px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
          <Box>
            <Typography
              sx={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-16px",
              }}
            >
              Chương Trình quảng cáo
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: colors.primary[900],
          width: "20pc",
          height: "40vh",
          mt: "20px",
          borderRadius: "20px",
          flex: "1",
        }}
      >
        <Typography sx={{ textAlign: "center", fontSize: "18px" }}>
          Đề nghị dành cho bạn
        </Typography>
        <Box>
          {users.map((item, index) => (
            <Follow userdetails={item} key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Rightbar;
