import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function getJwt(user_id) {
  return jwt.sign({ user_id }, process.env.secret, { expiresIn: "1h" });
}
