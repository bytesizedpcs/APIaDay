const User = require('../models/schemas/user.js');

exports.getUsers = (req, res, next) => {
  User.find({}, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
};

exports.getUserById = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return next(err);
    res.json(user);
  });
};

exports.createUser = (req, res, next) => {
  let userData = {};

  if (req.body.username && typeof req.body.username === 'string')
    userData.username = req.body.username;
  
  // validate email
  // http://emailregex.com
  if (req.body.email) {
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)))
      return res.status(400).send('Invalid email');
    else
      userData.email = req.body.email;
  }

  const newUser = new User(userData);

  newUser.save((err, user) => {
    if (err) {
      if (err.code === 11000)
        return res.status(400).send('Email already registered');
      return next(err);
    }
    return res.sendStatus(200);
  });
};

exports.updateUser = (req, res, next) => {
  User.findOneAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(404).send('No user with that id');
    return res.sendStatus(200);
  });
};
