const jwt = require("jsonwebtoken");

function checkLogin(req, res, next) {
  try {
    const header = req.headers.authorization || req.header("Authorization");
    if (!header) {
      console.warn("Missing Authorization header");
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Expected format: "Bearer <token>"
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      console.warn("Authorization header malformed:", header);
      return res.status(401).json({ message: "Authorization header malformed" });
    }

    const token = parts[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const secret = process.env.JWT_SECRET || "thisisyoursecuritykey";

    // Verify token (will throw on invalid/expired)
    const decoded = jwt.verify(token, secret);

    // attach useful info
    req.userId = decoded.id || decoded.userId || decoded._id;
    req.tokenPayload = decoded;

    return next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
}

module.exports = checkLogin;
