const mongoose = require('mongoose');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { 
    type: String,
    required: true,
    minlength: 3,
    index: { unique: true },
  },
  password: { 
    type: String, 
    required: true, 
  },
  email: {
    type: String,
    required: true,
  },
  },
  {
    toObject: { getters: true },
    timeStamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate'
    },
  }
);

userSchema.pre('save', async function(next) {
  // only hash password if it has been modified or new
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  } 
});

userSchema.methods.comparePassword = function(cPassword, callback) {
  bcrypt.compare(cPassword, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
