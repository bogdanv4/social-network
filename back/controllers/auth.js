const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
  //check if email(user) already exists
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse(`E-mail already exists`, 400));
  }

  try {
    //All good
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    // check if email and password are not entered
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse(`Email and password are required`, 400));
    }

    //check if bad email
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new ErrorResponse(`Invalid credentials - email doesn't exist`, 400)
      );
    }

    //check if bad password
    const userPassword = await User.findOne({ password });
    if (!userPassword) {
      return next(
        new ErrorResponse(`Invalid credentials - password doesn't match`, 400)
      );
    }

    // All good, generating token and cookie
    generateToken(user, 200, res);

    //password check with bcrypt

    // const isMatched = await user.comparePassword(password);
    // if (!isMatched) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid credentials",
    //   });
    // }
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(`Can not login, check your credentials`, 400));
  }
};

exports.logout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

exports.singleUser = async (req, res, next) => {
  try {
    //All good
    const user = await User.findById(req.params.id);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    next(new ErrorResponse(`User with id: ${req.params.id} is not found`, 404));
  }
};

const generateToken = async (user, statusCode, res) => {
  const token = await user.jwtGenerateToken();

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + parseInt(process.env.EXPIRE_TOKEN)),
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
