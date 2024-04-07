const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  lastname: String,
  email : String,
  password: String,
  status: {type: Number ,default : 1},
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization' },
  createdBy: { type: mongoose.Types.ObjectId,ref: "user", default: null},    
  createdAt: { type: Date,default: Date.now()},   
  updatedBy: { type: mongoose.Types.ObjectId,ref: "user",default: null, },
  updatedAt: { type: Date,default: Date.now()},},
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
