const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");

// Signup
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: "Signup successful", user: data.user });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(401).json({ error: error.message });
  res
    .status(200)
    .json({
      message: "Login successful",
      session: data.session,
      user: data.user,
    });
});

module.exports = router;
