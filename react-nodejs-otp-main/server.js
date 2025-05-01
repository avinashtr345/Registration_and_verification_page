const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected to mydatabase'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Define Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  otp: String,
});

const User = mongoose.model('User', userSchema);

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Create new user with OTP
    const newUser = new User({ username, email, password, otp });
    await newUser.save();

    // Send OTP to client as part of the response
    res.status(200).json({ message: 'User registered', otp });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// OTP Verify route
app.post('/verify', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, otp });
    if (user) {
      res.status(200).json({ message: 'Email verified' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
