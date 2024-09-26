const mongoose = require('mongoose');
const Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid');

const UserSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    default : () => uuidv4()},

  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;
