const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: { 
    type: String, 
    trim: true 
  },
  email: { 
    type: String, 
    unique: true,
    sparse: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    index: true,
  },
  hash: String,
},
  {
    toObject: { getters: true },
    timeStamps: {
      createdAt: 'createdDate',
      updatedAt: 'updatedDate',
    },
  },
);

userSchema.pre('save', (callback) => {
  if (this.isAdmin) {
    if (!this.email) return callback(new Error('Missing Email'));
    if (!this.hash) return callback(new Error('Missing password'));

    if (this.isModified('hash')) {
      this.hash = bcrypt.hashSync(this.hash);
    }
  }
  callback();
});

userSchema.methods.checkPassword = function(pw, next) {
  bcrypt.compare(pw, this.hash, function(err, res) {
    if (err) return next(err);
    next(null, res);
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
