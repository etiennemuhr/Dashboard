const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

const connectDB = require("./config/db");

const app = express();

// Route Files

const customers = require("./routes/customers");
const receipts = require("./routes/receipts");
const settings = require("./routes/settings");
const auth = require("./routes/auth");

// Load env vars

dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Middleware

// Body parser

app.use(express.json());

// CORS

app.use(cors({ origin: "*" }));

// Cookie parser

app.use(cookieParser());

//Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routes

app.use("/api/v1/customers", customers);
app.use("/api/v1/receipts", receipts);
app.use("/api/v1/settings", settings);
app.use("/api/v1/auth", auth);

// Error handler

app.use(errorHandler);

// Create Server

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
});
