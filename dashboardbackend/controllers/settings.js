const Settings = require("../models/Settings");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get settings
// @router  GET /api/v1/settings
// @access  Public
exports.getSettings = asyncHandler(async (req, res, next) => {
  const settings = await Settings.find();

  res.status(200).json({ success: true, data: settings });
});

// @desc    Create settings
// @router  POST /api/v1/settings
// @access  Private
exports.createSettings = asyncHandler(async (req, res, next) => {
  const checkSettings = await Settings.find();
  if (checkSettings.length === 0) {
    const settings = await Settings.create(req.body);
    res.status(201).json({ success: true, data: settings });
  } else {
    return next(new ErrorResponse(`Settings already exists`, 500));
  }
});

// @desc    Update settings
// @router  PUT /api/v1/settings
// @access  Private
exports.updateSettings = asyncHandler(async (req, res, next) => {
  const settings = await Settings.findOneAndUpdate(req.body._id, req.body, {
    new: true,
    runValidators: true
  });
  if (!settings) {
    return res.status(400).json({ success: "false" });
  }
  res.status(200).json({ success: true, data: settings });
});
