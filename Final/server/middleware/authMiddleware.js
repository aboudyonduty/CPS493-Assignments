// بسم الله

const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extracts token from 'Bearer TOKEN'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

function decodeJWT(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Assumes 'Bearer TOKEN'
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attaches user data to request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
