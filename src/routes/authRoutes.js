const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');
const User = require('../models/User');
const Organization = require('../models/Organization');
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

// Login endpoint
router.post('/login', passport.authenticate('local'), (req, res) => {
  try{
    const user = req.user;
    res.json({ message: 'Login successful', user });
  }catch(err){
    res.status(500).json({ message: err.message });
  }
  
});

// Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { username, password, role, email, organization } = req.body;
    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'This email is already registered' });
    }

    const user = new User({ username, password, role, email, organization });
    await Organization.findOneAndUpdate({ _id: new ObjectId(organization) },
      { $push: { users: new ObjectId(user._id) } }, { new: true });

    await user.save();
    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
