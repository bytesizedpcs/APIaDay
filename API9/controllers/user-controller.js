const User = require('../models/schemas/user-schema.js');
let idCounter = 0;

exports.getUsers = function(req, res, next) {
  // Query database
  User.find({}, (err, users) => {
    if (err) return next(err);
    // send json of all users
    res.json(users);
  });
  res.send('Found some users');
};

exports.getUserById = function(req, res, next) {
  User.findById(req.params.id).exec((err, user) => {
    if (err) return next(err);
    if (!user) return res.status(404).send('No user with that ID');
    res.json(user);
  });
};

exports.createUser = function(req, res, next) {
  let userData = {};

  if (req.body.username && typeof req.body.username === 'string')
    userData.username = req.body.username;
  if (req.body.email)
    userData.user

  if (req.body.email) {
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)))
      return res.status(400).send('Invalid email');
    else
      userData.email = req.body.email;
  }
  
  if (req.body.password)
    userData.hash = req.body.password;
  if (req.body.hash)
    userData.hash = req.body.hash;

  const newUser = new User(userData);
  newUser.save((err, user) => {
    if (err) {
      if (err.code === 11000)
        return res.status(400).send('Email already registered');
      return next(err);
    }
  }); 
}

exports.updateUser = function(req, res, next) {
  User.findOneAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(404).send('No user with that ID');
    return res.sendStatus(200);
  });
};

exports.deleteUserById = function(req, res, next) {
  User.findOneAndRemove(req.params.id, (err, user) => {

    if (err) return next(err); 
    if (!user) return res.status(404).send('No user with that ID');
    
  });
};
