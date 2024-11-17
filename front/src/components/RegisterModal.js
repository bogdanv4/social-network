import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "../Validation";
import axios from "axios";

function RegisterModal({ onClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validator = new Validation(username, email, password, confirmPassword);

  const handleUsername = (e) => {
    setUsername(e.target.value);

    const error = validator.validateUsername(e.target.value);
    setErrorUsername(error);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);

    const error = validator.validateEmail(e.target.value);
    setErrorEmail(error);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);

    const error = validator.validatePassword(e.target.value);
    setErrorPassword(error);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);

    const error = validator.validateConfirmPassword(e.target.value, password);
    setErrorConfirmPassword(error);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!username) {
      hasError = true;
    }

    if (!email) {
      hasError = true;
    }

    if (!password) {
      hasError = true;
    }

    if (!confirmPassword) {
      hasError = true;
    }

    setErrorUsername(validator.validateUsername(username));
    setErrorEmail(validator.validateEmail(email));
    setErrorPassword(validator.validatePassword(password));
    setErrorConfirmPassword(
      validator.validateConfirmPassword(confirmPassword, password)
    );

    if (!hasError) {
      try {
        const signUser = await axios.post("/api/signup", {
          username,
          email,
          password,
        });
        console.log(signUser);
        alert("Registration successful!");
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="modal">
      <h2>Register</h2>
      <button className="modal-close" onClick={onClose}>
        x
      </button>
      <form>
        <div className="form-field">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsername}
          />
        </div>
        {errorUsername && <p className="error">{errorUsername}</p>}
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmail}
          />
        </div>
        {errorEmail && <p className="error">{errorEmail}</p>}
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        {errorPassword && <p className="error">{errorPassword}</p>}
        <div className="form-field">
          <label htmlFor="password-confirm">Confirm password:</label>
          <input
            type="password"
            name="password-confirm"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
        </div>
        {errorConfirmPassword && (
          <p className="error">{errorConfirmPassword}</p>
        )}

        <button className="regular-button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}
export default RegisterModal;
