// //Temporarily skip DB connection

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




require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); // parse JSON bodies

import healthRouter from "./routes/health.js";
import authRouter from "./routes/auth.js";
import itemsRouter from "./routes/items.js";
import checkoutRouter from "./routes/checkout.js";
import webhooksRouter from "./routes/webhooks.js";
import rentalsRouter from "./routes/rentals.js";
import qrRouter from "./routes/qr.js";
import uploadsRouter from "./routes/uploads.js";
import adminRouter from "./routes/admin.js";

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/navbar', require('./routes/navbar'));
app.use("/healthz", healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/items", itemsRouter);
app.use("/api/v1/checkout", checkoutRouter);
app.use("/api/v1/webhooks", webhooksRouter);
app.use("/api/v1/rentals", rentalsRouter);
app.use("/api/v1/qr", qrRouter);
app.use("/api/v1/uploads", uploadsRouter);
app.use("/api/v1/admin", adminRouter);


// serve react build in production (optional)
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '..', 'client', 'build'); // adjust if your client is elsewhere
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
