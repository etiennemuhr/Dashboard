const Receipt = require("../models/Receipt");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all receipts
// @router  GET /api/v1/customers
// @access  Public
exports.getReceipts = asyncHandler(async (req, res, next) => {
  const receipt = await Receipt.find();

  res.status(200).json({ success: true, count: receipt.length, data: receipt });
});

// @desc    Create receipt
// @router  POST /api/v1/customers
// @access  Private
exports.createReceipt = asyncHandler(async (req, res, next) => {
  let updatedReceipt;
  const lastReceipt = await Receipt.findOne(
    {},
    {},
    { sort: { createdAt: -1 } }
  );

  console.log(lastReceipt);
  if (!lastReceipt) {
    updatedReceipt = {
      ...req.body,
      receiptNumber: 1
    };
  } else {
    updatedReceipt = {
      ...req.body,
      receiptNumber: parseInt(lastReceipt.receiptNumber) + 1 || 1
    };
  }

  const receipt = await Receipt.create(updatedReceipt);
  res.status(201).json({ success: true, data: receipt });
});

// @desc    Get singel receipt by id
// @router  GET /api/v1/customers/:id
// @access  Private
exports.getReceipt = asyncHandler(async (req, res, next) => {
  const receipt = await Receipt.findById(req.params.id);
  if (!receipt) {
    return next(
      new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: receipt });
});

// @desc    Update receipt by id
// @router  PUT /api/v1/customers/:id
// @access  Private
exports.updateReceipt = asyncHandler(async (req, res, next) => {
  const receipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!receipt) {
    return res.status(400).json({ success: "false" });
  }
  res.status(200).json({ success: true, data: receipt });
});

// @desc    Delete receipt by id
// @router  DELETE /api/v1/customers/:id
// @access  Private
exports.deleteReceipt = asyncHandler(async (req, res, next) => {
  const receipt = await Receipt.findByIdAndDelete(req.params.id);
  if (!receipt) {
    return res.status(400).json({ success: "false" });
  }
  res.status(200).json({ success: true, data: {} });
});

// @desc    Get last receipt number
// @router  GET /api/v1/receipt/:id
// @access  Private
exports.getLastReceiptNumber = asyncHandler(async (req, res, next) => {
  const receipt = await Receipt.findOne({}, {}, { sort: { createdAt: -1 } });
  res.status(200).json({ success: true, data: receipt.receiptNumber });
});
