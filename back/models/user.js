const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// UNCOMMENT IF YOU WANT PASSWORD ENCRYPTION
// const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    username: {
      type: String,
      trim: true,
      required: [true, "Please add an username"],
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please add an E-mail"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please add a password"],
      minlength: [8, "Password should have at least 8 characters"],
    },
  },
  { timestamp: true }
);

// PASSWORD ENCRYPTION

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

// COMPARE PASSWORD WITH BCRYPT

// userSchema.methods.comparePassword = async function (yourPassword) {
//   return await bcrypt.compare(yourPassword, this.password);
// };

// CREATING LOGIN TOKEN
userSchema.methods.jwtGenerateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

module.exports = mongoose.model("User", userSchema);
