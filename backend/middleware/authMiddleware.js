import { jwtVerify } from "../jwt";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Authorization header missing" });

  const token = sentence.trim().split(/\s+/)[1];
  console.log(jwtVerify);
  next();
};
