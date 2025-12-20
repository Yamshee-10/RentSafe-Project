// Backend/src/routes/auth.js
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

// path to JSON storage
const jsonPath = path.join(__dirname, "..", "tempData", "Users.json");

// ensure file exists
function ensureFile() {
  const dir = path.dirname(jsonPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(jsonPath)) fs.writeFileSync(jsonPath, JSON.stringify([], null, 2));
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    ensureFile();

    const {
      name,
      mobile,
      email,
      gender,
      age,
      address = {},
      aadhar,
      password,
    } = req.body;

    // POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ message: "Identifier and password required" });
    }

    ensureFile();
    const raw = fs.readFileSync(jsonPath, "utf-8");
    const users = raw ? JSON.parse(raw) : [];

    const user = users.find(
      u => u.email === identifier || u.mobile === identifier
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Do NOT send password hash
    const safeUser = { ...user };
    delete safeUser.passwordHash;

    res.json({
      message: "Login successful",
      user: safeUser
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

    // basic validation
    if (!name || !mobile || !email || !password) {
      return res.status(400).json({ message: "name, mobile, email, password are required" });
    }

    // load existing users
    const raw = fs.readFileSync(jsonPath, "utf-8");
    const users = raw ? JSON.parse(raw) : [];

    // avoid duplicate email or mobile
    if (users.some(u => u.email === email || u.mobile === mobile)) {
      return res.status(400).json({ message: "User with same email or mobile already exists" });
    }

    // hash password (recommended)
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = {
      id: Date.now(),
      name,
      mobile,
      email,
      gender,
      age,
      address,
      aadhar,
      passwordHash: hashed,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    fs.writeFileSync(jsonPath, JSON.stringify(users, null, 2));

    // do not return sensitive info
    const safeUser = { ...newUser };
    delete safeUser.passwordHash;
    res.status(201).json({ message: "User created", user: safeUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

