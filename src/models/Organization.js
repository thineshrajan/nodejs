const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: {type: Number ,default : 1},
  createdBy: { type: mongoose.Types.ObjectId,ref: "user", default: null},    
  createdAt: { type: Date,default: Date.now()},   
  updatedBy: { type: mongoose.Types.ObjectId,ref: "user",default: null, },
  updatedAt: { type: Date,default: Date.now()},},
  { timestamps: true }
);

module.exports = mongoose.model('Organization', organizationSchema);
