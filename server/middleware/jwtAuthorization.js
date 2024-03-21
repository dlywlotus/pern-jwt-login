import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function jwtAuthorization(req, res, next) {
  try {
    const token = req.header("token");
    if (!token) res.status(403).json("Not authorized");

    const payload = jwt.verify(token, process.env.secret);
    req.user_id = payload.user_id;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(403).json("Not authorized");
  }
}
