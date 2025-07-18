const express = require("express");
const router = express.Router();
const supabase = require("../supabaseClient");
const verifyToken = require("../middleware/verifyToken");

// ✅ POST /api/tutors → Create or update tutor profile
router.post("/", verifyToken, async (req, res) => {
  const { full_name, bio, subjects, available } = req.body;
  const userId = req.user.sub;
  const email = req.user.email;

  const { data, error } = await supabase
    .from("tutors")
    .upsert([
      {
        id: userId,
        email,
        full_name,
        bio,
        subjects,
        available,
      },
    ])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: "Tutor saved", tutor: data[0] });
});

// ✅ GET /api/tutors → Fetch all tutors
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("tutors").select("*");

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ tutors: data });
});

module.exports = router;
