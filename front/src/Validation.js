class Validation {
  constructor(username, email, password, confirmPassword) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
  validateUsername(username) {
    let error = "";
    if (username === "") return "Username is required";
    if (username.length >= 5) return error;
    else {
      error = "Username must be at least 5 characters long";
      return error;
    }
  }
  validatePassword(password) {
    let error = "";
    if (password === "") return "Password is required";
    if (password.length >= 8) return error;
    else {
      error = "Password must be at least 8 characters long";
      return error;
    }
  }
  validateConfirmPassword(confirmPassword, password) {
    let error = "";
    if (confirmPassword === "") return "Confirm password is required";
    if (confirmPassword === password) return error;
    else {
      error = "Passwords don't match";
      return error;
    }
  }
  validateEmail(email) {
    let error = "";
    if (email === "") return "Email is required";
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailPattern.test(email)) {
      return error;
    } else {
      error = "Invalid email address";
      return error;
    }
  }
}

export default Validation;
