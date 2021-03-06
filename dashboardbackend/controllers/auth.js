const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Register User
// @router  POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({ name, email, password, role });

  // Create token and send it (Cookie)

  sendTokenResponse(user, 200, res);
});

// @desc    Login User
// @router  POST /api/v1/auth/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password

  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide and email and password", 400)
    );
  }

  // Check for user

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Create token and send it (Cookie)

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response

const sendTokenResponse = (user, statusCode, res) => {
  // Create token

  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

// @desc    Login User
// @router  POST /api/v1/auth/login
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, data: user });
});
