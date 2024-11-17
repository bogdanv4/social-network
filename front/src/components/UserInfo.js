// import { useEffect, useState } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserInfo({ onClose, loggedInUser }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (name === "") alert("You need to add name");
    else {
      // eslint-disable-next-line no-restricted-globals
      if (confirm("Are you sure you want to update user")) {
        axios
          .put(`/api/user/updateUser/${loggedInUser._id}`, { name: name })
          .then((result) => {
            console.log(result.data);
            alert("User updated");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete user")) {
      axios
        .delete(`/api/user/deleteUser/${loggedInUser._id}`)
        .then(() => {
          localStorage.removeItem("token");
          alert("User deleted");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="user-info-overlay">
      <div className="user-info-content">
        <h2>{`Hello ${loggedInUser.username} `}</h2>
        <h5>Your user info:</h5>
        <form className="user-info-form">
          <div className="form-field">
            <input
              type="text"
              name="username"
              value={loggedInUser.username}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-field">
            <input
              type="text"
              name="name"
              value={loggedInUser.name !== "" ? loggedInUser.name : name}
              onChange={handleName}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-field">
            <input
              type="email"
              name="email"
              value={loggedInUser.email}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-field">
            <input
              type="text"
              name="password"
              value={loggedInUser.password}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-buttons">
            <button className="regular-button" onClick={handleUpdateUser}>
              Update user
            </button>
            <button
              className="regular-button delete-button"
              onClick={handleDeleteUser}
            >
              Delete user
            </button>
          </div>
        </form>
        <button className="modal-close" onClick={onClose}>
          x
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
