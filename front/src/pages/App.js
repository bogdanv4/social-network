import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import PrivateRoute from "../components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const googleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <>
      <GoogleOAuthProvider clientId={`${googleClientID}`}>
        <ToastContainer position="bottom-left" theme="dark" />
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<LoginPage />} />
            {/* <Route path="home" element={<HomePage />} /> */}\
            <Route
              path="home"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
