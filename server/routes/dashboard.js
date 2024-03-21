import express from "express";
import pool from "../db.js";
import jwtAuthorization from "../middleware/jwtAuthorization.js";

const router = express.Router();

router.post("/", jwtAuthorization, async (req, res) => {
  try {
    const user_id = req.user_id;
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
