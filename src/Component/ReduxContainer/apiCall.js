import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from "./userReducer.js";
import { baseURL } from "../../Urls.js";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${baseURL}/api/v1/user/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const VerifyEmail = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${baseURL}/api/v1/user/verify/email`, user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

// export const signup = async (dispatch, user) => {
//   dispatch(loginStart());
//   try {
//     const res = await axios.post(
//       "http://localhost:8080/api/v1/user/create-user",
//       user
//     );
//     dispatch(loginSuccess(res.data));
//   } catch (error) {
//     dispatch(loginFailure());
//   }
// };
export const signup = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${baseURL}/api/v1/user/create-user`, user);
    console.log(res.data); // Log dữ liệu trả về từ server
    dispatch(loginSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(loginFailure());
  }
};
