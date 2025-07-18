const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const bearer = req.headers["authorization"];
  if (!bearer) return res.status(401).json({ error: "Missing token" });

  const token = bearer.split(" ")[1]; // Remove "Bearer "

  try {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) throw new Error("Invalid token");

    req.user = decoded.payload;
    next();
  } catch (err) {
    res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports = verifyToken;
