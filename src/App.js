import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useSelector } from "react-redux";
import Forgotpassword from "./Pages/Forgotpassword";
import ResetPassword from "./Pages/ResetPassword";
import Verifyemail from "./Pages/VerifyEmail";
import Chat from "./Pages/Chat";

function App() {
  const [theme, colorMode] = useMode();

  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  // console.log(userDetails);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  user?.other?.verifed === true ? (
                    <Home />
                  ) : (
                    <Navigate to={"/login"} replace={true} />
                  )
                }
              ></Route>
              <Route path="/Profile/:id" element={<Profile />}></Route>
              <Route
                path="/login"
                element={
                  user?.other?.verifed === true ? (
                    <Navigate to={"/"} replace={true} />
                  ) : (
                    <Login />
                  )
                }
              ></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/verify/email"
                element={
                  user?.Status === "Pending" ? (
                    <Verifyemail />
                  ) : user?.other?.verifed === true ? (
                    <Navigate to={"/"} replace={true} />
                  ) : (
                    <Login />
                  )
                }
              ></Route>

              <Route
                path="/forgot-password"
                element={<Forgotpassword />}
              ></Route>
              <Route path="/reset-password" element={<ResetPassword />}></Route>
              <Route path="/chat" element={<Chat />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
