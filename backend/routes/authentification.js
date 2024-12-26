import express from "express";
import Database from "better-sqlite3";
import { resolve } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const dbPath = resolve("database/database.db");
const db = new Database(dbPath);

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ success: false, message: "You are not authenticated!" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Token is not valid!" });
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  const query = "INSERT INTO refresh_tokens (token) VALUES (?)";
  db.prepare(query).run(refreshToken);
  return refreshToken;
}

router.post("/register", async (req, res) => {
  const q = "INSERT INTO users (name, password) VALUES (?, ?)";
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    db.prepare(q).run(req.body.name, hashedPassword);
    res.status(201).send("The account was successfully created!");
  } catch (error) {
    console.error("Error during account creation:", error.message);
    res.status(500).send("Error during account creation!");
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const q = "SELECT * FROM users WHERE name = ?";
  const user = db.prepare(q).get(name);

  if (!user) {
    return res.status(400).json({ success: false, message: "Username or password incorrect!" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ success: false, message: "Username or password incorrect!" });
  }

  const accessToken = generateAccessToken({ id: user.id, name: user.name });
  const refreshToken = generateRefreshToken({ id: user.id, name: user.name });

  res.json({
    id: user.id,
    username: user.name,
    accessToken,
    refreshToken,
  });
});

router.delete("/:userId", verifyToken, (req, res) => {
  const roleQuery = "SELECT role_id FROM userroles WHERE id = ?";
  const userRole = db.prepare(roleQuery).get(req.params.userId);
  const isAdmin = userRole?.role_id === 1;

  if (req.user.id === parseInt(req.params.userId) || isAdmin) {
    const deleteQuery = "DELETE FROM users WHERE id = ?";
    db.prepare(deleteQuery).run(req.params.userId);
    res.status(200).send("The user was successfully deleted!");
  } else {
    res.status(403).send("You are not authorized to delete this user!");
  }
});

router.post("/refresh", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.status(401).json({ success: false, message: "You are not authenticated!" });

  const query = "SELECT * FROM refresh_tokens WHERE token = ?";
  const tokenEntry = db.prepare(query).get(refreshToken);

  if (!tokenEntry) {
    return res.status(403).json({ success: false, message: "Refresh token is not valid!" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: "Token is not valid!" });

    const accessToken = generateAccessToken({ id: user.id, name: user.name });
    res.json({ accessToken });
  });
});

router.post("/logout", (req, res) => {
  const refreshToken = req.body.token;
  const query = "DELETE FROM refresh_tokens WHERE token = ?";
  db.prepare(query).run(refreshToken);
  res.status(200).send("Logged out successfully!");
});

export default router;
