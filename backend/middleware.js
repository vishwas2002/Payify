const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.error("Authorization header is missing or malformed.");
    return res.status(401).json({
      message: "Authorization header is missing or malformed",
    });
  }

  const token = authHeader.split(" ")[1];
   // Log the extracted token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     // Log the decoded token

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      console.error("Decoded token does not contain a valid userId.");
      return res.status(403).json({
        message: "Token does not contain a valid userId",
      });
    }
  } catch (err) {
    console.error("Token verification failed:", err.message); // Log the error for debugging

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
      });
    }

    return res.status(403).json({
      message: "Token verification failed",
    });
  }
};

module.exports = {
  authMiddleware,
};
