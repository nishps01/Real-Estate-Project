const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer "))
    return res.status(401).json({ message: "Authentication required" });
  try {
    req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
function adminOnly(req, res, next) {
  if (req.user?.role !== "ADMIN")
    return res.status(403).json({ message: "Admin access required" });
  next();
}
module.exports = { auth, adminOnly };
