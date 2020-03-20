const Customer = require("../models/Customer");
const Receipt = require("../models/Receipt");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all customers
// @router  GET /api/v1/customers
// @access  Public
exports.getCustomers = asyncHandler(async (req, res, next) => {
  console.log(req);
  const customers = await Customer.find();

  res
    .status(200)
    .json({ success: true, count: customers.length, data: customers });
});

// @desc    Create customer
// @router  POST /api/v1/customers
// @access  Private
exports.createCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.create(req.body);
  res.status(201).json({ success: true, data: customer });
});

// @desc    Get singel customer by id
// @router  GET /api/v1/customers/:id
// @access  Private
exports.getCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    return next(
      new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: customer });
});

// @desc    Update customer by id
// @router  PUT /api/v1/customers/:id
// @access  Private
exports.updateCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!customer) {
    return res.status(400).json({ success: "false" });
  }
  res.status(200).json({ success: true, data: customer });
});

// @desc    Delete customer by id
// @router  DELETE /api/v1/customers/:id
// @access  Private
exports.deleteCustomer = asyncHandler(async (req, res, next) => {
  const receipts = await Receipt.deleteMany(receipt.customer === req.params.id);
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) {
    return res.status(400).json({ success: "false" });
  }
  res.status(200).json({ success: true, data: {} });
});
