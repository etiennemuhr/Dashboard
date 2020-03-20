const express = require("express");
const {
  getReceipts,
  createReceipt,
  getReceipt,
  updateReceipt,
  deleteReceipt,
  getLastReceiptNumber
} = require("../controllers/receipts");
const router = express.Router();

router
  .route("/")
  .get(getReceipts)
  .post(createReceipt);

router.route("/receiptNumber").get(getLastReceiptNumber);
router
  .route("/:id")
  .get(getReceipt)
  .put(updateReceipt)
  .delete(deleteReceipt);

module.exports = router;
