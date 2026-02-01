// ===== Imports =====
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ===== Routes =====
const userRoutes = require("./routes/userRoutes");

// ===== App =====
const app = express();

app.use(cors());
app.use(express.json());

// ===== Routes Middleware =====
app.use("/users", userRoutes);

// ===== MongoDB Connection =====
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ===== Start Server =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});