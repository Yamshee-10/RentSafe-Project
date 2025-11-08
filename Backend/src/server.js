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

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/navbar', require('./routes/navbar'));

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
