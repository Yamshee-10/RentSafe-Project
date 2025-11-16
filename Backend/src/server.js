// //Temporarily skip DB connection

require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

// Sequelize instance (MySQL) – safe to import even if DB not ready
const sequelize = require('./config/db');

const app = express();

// ---------------------------
//  DATABASE (SAFE MODE)
// ---------------------------
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connected");

    await sequelize.sync();
    console.log("✅ MySQL tables synced");
  } catch (err) {
    console.log("⚠️ MySQL not connected (skipping for now)");
    console.log("Reason:", err.message);
  }
})();

// ---------------------------
//  MIDDLEWARES
// ---------------------------
app.use(cors());
app.use(express.json());

// ---------------------------
//  ROUTES
// ---------------------------
app.use('/api/auth', require('./routes/auth'));
app.use('/api/navbar', require('./routes/navbar'));
app.use('/api/products', require('./routes/products'));


// ---------------------------
//  FRONTEND (PRODUCTION ONLY)
// ---------------------------
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// ---------------------------
//  START SERVER
// ---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// require('dotenv').config();
// const express = require('express');
// const path = require('path');
// const cors = require('cors');

// // ⬅ NEW: Import Sequelize connection instead of MongoDB
// const sequelize = require('./config/db');

// const app = express();

// // ⬅ NEW: Test and sync MySQL connection
// // sequelize.authenticate()
// //   .then(() => console.log("✅ MySQL connected"))
// //   .catch(err => console.log("❌ MySQL connection error:", err));

// // sequelize.sync()
// //   .then(() => console.log("✅ MySQL tables synced"))
// //   .catch(err => console.log("❌ Sync error:", err));

// app.use(cors());
// app.use(express.json());

// // routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/navbar', require('./routes/navbar'));

// // Production - serve frontend
// if (process.env.NODE_ENV === 'production') {
//   const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
//   app.use(express.static(clientBuildPath));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(clientBuildPath, 'index.html'));
//   });
// }

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));











// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// // const connectDB = require('./config/db'); // temporarily comment this line

// const app = express();

// app.use(cors());
// app.use(express.json());

// // connectDB(); // comment out temporarily

// app.get('/', (req, res) => {
//   res.send('Backend is running successfully without DB');
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// require('dotenv').config();
// const express = require('express');
// const path = require('path');
// const cors = require('cors');
// const connectDB = require('./config/db');

// const app = express();
// connectDB();

// app.use(cors());
// app.use(express.json()); // parse JSON bodies

// // routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/navbar', require('./routes/navbar'));

// // serve react build in production (optional)
// if (process.env.NODE_ENV === 'production') {
//   const clientBuildPath = path.join(__dirname, '..', 'client', 'build'); // adjust if your client is elsewhere
//   app.use(express.static(clientBuildPath));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(clientBuildPath, 'index.html'));
//   });
// }

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
