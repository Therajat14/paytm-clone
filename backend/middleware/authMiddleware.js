const { jwtVerify } = require("../jwt");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Authorization header missing" });

  const token = authHeader.trim().split(/\s+/)[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  const decoded = jwtVerify(token);
  if (!decoded) return res.status(401).json({ message: "Invalid token" });

  req.userId = decoded.userId;

  next();
};

module.exports = authMiddleware;
