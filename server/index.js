const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json({ extended: false }));

app.use("/", require("./routes/redirect"));
app.use("/api/url", require("./routes/url"));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "SwiftLink API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
