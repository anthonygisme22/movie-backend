import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
  // Expect the token in the Authorization header as: Bearer <token>
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: "No token provided" });
  
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
