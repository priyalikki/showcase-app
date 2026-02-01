const express = require("express");
const router = express.Router();
const User = require("../models/User");


// ==============================
// GET all users
// ==============================
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});


// ==============================
// POST create new user
// ==============================
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});


// ==============================
// PUT update user
// ==============================
router.put("/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedUser);
});


// ==============================
// DELETE user
// ==============================
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({ message: "User deleted successfully ✅" });
});


module.exports = router;