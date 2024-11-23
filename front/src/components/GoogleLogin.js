import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

function GoogleLogin() {
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      try {
        const tokens = await axios.post("/api/auth/google", {
          code,
        });

        console.log(tokens);
        alert(
          "User created\nLogin with you email, and password\nNOTE: Your new password is you google acount NAME"
        );
      } catch (error) {
        console.error(error.response.data.message);
        alert(error.response.data.message);
      }
    },
    onError: (error) => console.log(error),
  });
  return (
    <button className="regular-button" onClick={googleLogin}>
      Sign in with
      <img src="google.png" alt="google icon" />
    </button>
  );
}

export default GoogleLogin;
