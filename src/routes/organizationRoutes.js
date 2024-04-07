const express = require('express');
const router = express.Router();
const Organization = require('../models/Organization');
const mongoose = require('mongoose')
const ObjectId =mongoose.Types.ObjectId;

router.get('/', async (req, res) => {
  try {
    const organizations = await Organization.find({ status: { $ne: 0 } }).populate({
      path: 'users',
      select: 'username email status',
      match: { status: { $ne: 0 } ,role : {$ne : "admin"}} 
    });
    
    res.status(200).json(organizations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getOrganization, (req, res) => {
  try{
    res.status(200).json(res.organization);
  }catch(err){
    res.status(500).json({ message: err.message });
  }  
});

router.post('/', async (req, res) => {
  const organization = new Organization({
    name: req.body.name,
    users: req.body.users
  });

  try {
    const newOrganization = await organization.save();
    res.status(201).json(newOrganization);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', getOrganization, async (req, res) => {
  if (req.body.name != null) {
    res.organization.name = req.body.name;
  }

  if (req.body.users != null) {
    res.organization.users = req.body.users;
  }
   res.organization.status = 2;
  try {
    const updatedOrganization = await res.organization.save();
    res.status(200).json(updatedOrganization);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getOrganization, async (req, res) => {
  try {
    const id = req.params.id;
    const authID = res.user.id;
    const deleteItem = {
      status: 0,
      updatedBy: authID,
    };
    const data = await Organization.findByIdAndUpdate(id, deleteItem);
    res.json({ message: 'Organization deleted' ,data});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getOrganization(req, res, next) {
  let organization;
  try {
    organization = await Organization.findOne({ status: {$ne:0},users: { $in: [new ObjectId(req.params.id)] } }).
    populate({
        path:"users" ,select:"username email" ,match:{_id:new ObjectId(req.params.id)}})

    if (organization == null) {
      return res.status(404).json({ message: 'Organization not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.organization = organization;
  next();
}

module.exports = router;
