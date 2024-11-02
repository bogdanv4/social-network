import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import axios from "axios";

function Navbar({ loggedInUser }) {
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("/api/logout")
      .then(() => {
        localStorage.removeItem("token");
        alert("Logout successfull");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openUserInfo = () => {
    setIsUserInfoOpen(true);
  };

  const closeUserInfo = () => {
    setIsUserInfoOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-items">
        <button className="icon-btn" onClick={handleLogout}>
          <img src="logout.png" alt="logout" />
        </button>
      </div>
      <div className="navbar-items">
        <p>Social Network</p>
      </div>
      <div className="navbar-items">
        <button className="icon-btn" onClick={openUserInfo}>
          <img src="user.png" alt="user-icon" />
        </button>
        {isUserInfoOpen && (
          <UserInfo onClose={closeUserInfo} loggedInUser={loggedInUser} />
        )}
      </div>
    </nav>
  );
}
export default Navbar;
