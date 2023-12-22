const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/usermangementsystem')
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  image: String,
  password: { type: String, required: true },
  is_admin: { type: Number, required: true },
  is_verified: { type: Number, required: true ,default:0},
});

module.exports = mongoose.model('User', userSchema);


