import config from "config";
import jwt from "jsonwebtoken";

const jwtsecret = config.get("JWT_SECRET");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);

  const token = authHeader.split(" ")[1];

  try {
    const decrypt = jwt.verify(token, jwtsecret);
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default authMiddleware;