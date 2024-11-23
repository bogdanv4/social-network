import GoogleLogin from "../components/GoogleLogin.js";
import LoginForm from "../components/LoginForm.js";
import RegisterModal from "../components/RegisterModal.js";
import { useState } from "react";

function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="test">
      <div className="form-wrapper">
        <LoginForm />
        <section className="register-section">
          <h2>Dont have an account?</h2>
          <button className="regular-button" onClick={handleModalOpen}>
            Register
          </button>
        </section>
        {isModalOpen && <RegisterModal onClose={handleModalClose} />}
        <section className="google-login">
          <h2>or</h2>
          <GoogleLogin />
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
