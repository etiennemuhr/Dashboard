const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema(
  {
    receiptNumber: {
      type: String,
      required: [true, "Please add a receipt number"],
      unique: true
    },
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "Customer",
      required: true
    },
    net: { type: String, required: true },
    ust: { type: String, required: true },
    brutto: { type: String, required: true },
    receiptData: [
      {
        pos: { type: Number, required: true },
        productNumber: { type: String, required: true },
        type: { type: String, required: true },
        amount: { type: String, required: true },
        pricePerProduct: { type: String, required: true },
        total: { type: Number, required: true }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receipt", ReceiptSchema);
