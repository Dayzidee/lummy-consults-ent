const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Sample route
app.get("/", (req, res) => {
  res.send("Lummy Consults Backend is Live!");
});

const verifyToken = require("./middleware/verifyToken");

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "You accessed a protected route",
    user: req.user,
  });
});

const tutorRoutes = require("./routes/tutorRoutes");
app.use("/api/tutors", tutorRoutes);


// ✅ Start server ONCE — using your configured PORT
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
