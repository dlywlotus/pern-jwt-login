import express from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import getJwt from "../utils/jwtGenerator.js";
import jwtAuthorization from "../middleware/jwtAuthorization.js";

const router = express.Router();

//register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username.length < 8)
      return res.status(401).json("Username is too short");

    if (password.length < 8) {
      return res.status(401).json("Password is too short");
    }

    //check if user is already registered
    const user = await pool.query(
      "SELECT * FROM users WHERE user_name = $1",
      [username]
    );
    if (user.rows.length !== 0)
      return res.status(401).json("User already exists");

    //bcrypt password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptedPassword = await bcrypt.hash(password, salt);

    //insert user data into database
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING * ",
      [username, bcryptedPassword]
    );

    //get json webtoken
    const jwt = getJwt(newUser.rows[0].user_id);
    res.json({ token: jwt });
  } catch (error) {
    console.log(error.message);
    res.json(500).json("Server Error");
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //check if user exists if not return error Username or password is incorrect
    const user = await pool.query(
      "SELECT * FROM users WHERE user_name = $1",
      [username]
    );
    if (user.rows.length === 0)
      return res
        .status(401)
        .json("Username or password is incorrect");

    //compare password with bcrypted password
    //if password is incorrect return Username or password is incorrect
    const bcryptedPassword = user.rows[0].user_password;
    const isCorrectPassword = await bcrypt.compare(
      password,
      bcryptedPassword
    );
    if (!isCorrectPassword)
      return res
        .status(401)
        .json("Username or password is incorrect");

    //get json webtoken
    const jwt = getJwt(user.rows[0].user_id);
    res.json({ token: jwt });
  } catch (error) {
    console.log(error.message);
    res.json(500).json("Server Error");
  }
});

router.post("/verify", jwtAuthorization, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.json(500).json("Server Error");
  }
});

export default router;
