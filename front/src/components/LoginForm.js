import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // if (email === "" || password === "")
    //   setError("Invalid email and/or password");
    try {
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });
      console.log(data);
      if (data.success === true) {
        alert("Login successfull");
        setEmail("");
        setPassword("");
        navigate("/home");
        if (typeof window !== "undefined") {
          localStorage.setItem("token", JSON.stringify(data));
        }
      }
    } catch (err) {
      console.log(err);
      setError("Invalid email and/or password");
    }
  };

  return (
    <form>
      <h2>Login</h2>
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
      {error && <p className="error">{error}</p>}
      <button className="regular-button" onClick={handleLogin}>
        Login
      </button>
    </form>
  );
}
export default LoginForm;
