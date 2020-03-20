const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars

dotenv.config({ path: "./config/config.env" });

// Load models

const Customer = require("./models/Customer");
const Receipt = require("./models/Receipt");

// Connect to DB

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Read JSON files

const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/customers.json`, "utf-8")
);

const receipts = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/receipts.json`, "utf-8")
);

const importData = async () => {
  try {
    await Customer.create(customers);

    console.log("Data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

const importDataReceipt = async () => {
  try {
    await Receipt.create(receipts);

    console.log("Receipt data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete data

const deleteData = async () => {
  try {
    await Customer.deleteMany();

    console.log("Data destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

const deleteDataReceipt = async () => {
  try {
    await Receipt.deleteMany();

    console.log("Receipt data destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
} else if (process.argv[2] === "-ri") {
  importDataReceipt();
} else if (process.argv[2] === "-rd") {
  deleteDataReceipt();
}
