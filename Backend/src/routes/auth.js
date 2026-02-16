// Backend/src/routes/auth.js

// Backend/src/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const User = require("../models/User");

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, aadhar, mobile, address, gender, age } = req.body;

    if (!name || !email || !password || !aadhar || !mobile || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { aadhar }] },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email or Aadhar already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone: mobile,
      gender,
      age,
      aadhar,
      address: JSON.stringify(address),
      password_hash: hashedPassword,
    });

    const safeUser = {
      ...newUser.toJSON(),
      address: JSON.parse(newUser.address),
    };
    delete safeUser.password_hash;

    res.status(201).json({
      message: "User registered successfully!",
      user: safeUser,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { phone: identifier }],
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ STORE SESSION
    req.session.userId = user.user_id;

    const safeUser = {
      ...user.toJSON(),
      address: user.address ? JSON.parse(user.address) : null,
    };
    delete safeUser.password_hash;

    res.status(200).json({
      message: "Login successful",
      user: safeUser,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= RESTORE SESSION ================= */
router.get("/me", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findByPk(req.session.userId, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const safeUser = {
      ...user.toJSON(),
      address: user.address ? JSON.parse(user.address) : null,
    };

    res.status(200).json({ user: safeUser });
  } catch (err) {
    console.error("Session check error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= LOGOUT ================= */
// router.post("/logout", (req, res) => {
//   req.session.destroy(() => {
//     res.clearCookie("rentsafe.sid");
//     res.status(200).json({ message: "Logged out" });
//   });
// });
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("rentsafe.sid", {
      path: "/",          // must match session config
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({ message: "Logged out successfully" });
  });
});

 module.exports = router;

// // Backend/src/routes/auth.js
// const express = require("express");
// const router = express.Router(); // ✅ THIS LINE WAS MISSING
// const bcrypt = require("bcrypt");
// const { Op } = require("sequelize");
// const User = require("../models/User");


// // POST /api/auth/register
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password, aadhar, mobile, address, gender, age } = req.body;

//     if (!name || !email || !password || !aadhar || !mobile || !address) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({
//       where: {
//         [Op.or]: [{ email }, { aadhar }],
//       },
//     });

//     if (existingUser) {
//       return res.status(400).json({ message: "Email or Aadhar already exists" });
//     }

//     const hashedPassword = bcrypt.hashSync(password, 10);

//     const newUser = await User.create({
//       name,
//       email,
//       phone: mobile,
//       gender,
//       age,
//       aadhar,
//       address: JSON.stringify(address), // ✅ stringify
//       password_hash: hashedPassword,
//     });

//     const safeUser = {
//       ...newUser.toJSON(),
//       address: JSON.parse(newUser.address), // ✅ parse back
//     };

//     delete safeUser.password_hash;

//     res.status(201).json({
//       message: "User registered successfully!",
//       user: safeUser,
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// // POST /api/auth/login
// router.post("/login", async (req, res) => {
//   try {
//     const { identifier, password } = req.body;

//     if (!identifier || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Find user by email OR phone
//     const user = await User.findOne({
//       where: {
//         [Op.or]: [
//           { email: identifier },
//           { phone: identifier },
//         ],
//       },
//     });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password_hash);

//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Safe user object
//     const safeUser = {
//       ...user.toJSON(),
//       address: user.address ? JSON.parse(user.address) : null,
//     };

//     delete safeUser.password_hash;
//     // ✅ store user id in session
//       req.session.userId = user.user_id;

//       res.status(200).json({
//         message: "Login successful",
//         user: safeUser,
//       });

//       // GET /api/auth/me
//       router.get("/me", async (req, res) => {
//         try {
//           if (!req.session.userId) {
//             return res.status(401).json({ message: "Not authenticated" });
//           }

//           const user = await User.findByPk(req.session.userId);

//           if (!user) {
//             return res.status(401).json({ message: "User not found" });
//           }

//           const safeUser = {
//             ...user.toJSON(),
//             address: user.address ? JSON.parse(user.address) : null,
//           };

//           delete safeUser.password_hash;

//           res.status(200).json({ user: safeUser });
//         } catch (err) {
//           console.error("Session check error:", err);
//           res.status(500).json({ message: "Server error" });
//         }
//       });


//     // res.status(200).json({
//     //   message: "Login successful",
//     //   user: safeUser,
//     // });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// module.exports = router; 
