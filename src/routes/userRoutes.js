const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const users = await User.find({status:{$ne:0}});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getUser, (req, res) => {
  try{
    res.status(200).json(res.user);
  }catch(err){
    res.status(500).json({ message: err.message });
  }
 
});

router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    email: req.body.email,
    organization: req.body.organization
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }

  if (req.body.password != null) {
    res.user.password = req.body.password;
  }

  if (req.body.role != null) {
    res.user.role = req.body.role;
  }
  if(req.body.organization != null){
    req.user.organization = req.body.organization;
  }
  req.user.status = 2;

  try {
    const updatedUser = await res.user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', getUser, async (req, res) => {
  try {
    const id = req.params.id;
    const authID = res.user.id;
    const deleteItem = {
      status: 0,
      updatedBy: authID,
    };
    const data = await User.findByIdAndUpdate(id, deleteItem);
    res.json({ message: 'User deleted' ,data});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
