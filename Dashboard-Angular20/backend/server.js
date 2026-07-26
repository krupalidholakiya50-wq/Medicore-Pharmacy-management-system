const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory.routes'); // Naya
const userRoutes = require('./routes/user.routes');           // Naya
const auth = require('./middleware/auth');
const app = express();

app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join("images")));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes); // Includes out-of-stock
app.use('/api/users', userRoutes);         // Account Management

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
