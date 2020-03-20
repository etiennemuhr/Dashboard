const express = require("express");
const {
  getCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer
} = require("../controllers/customers");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(protect, getCustomers)
  .post(protect, createCustomer);

router
  .route("/:id")
  .get(protect, getCustomer)
  .put(protect, updateCustomer)
  .delete(protect, deleteCustomer);

module.exports = router;
