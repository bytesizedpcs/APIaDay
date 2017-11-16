const User = require('../models/schemas/user-schema.js');
const jwt = require('jwt-simple');

// Login users
exports.loginUser = function(req, res, next) {
  // check email and password for availability
  if (typeof req.body.email !== 'string') {
    return res.status(400).send('Missing email');
  }
  if (typeof req.body.password !== 'string') {
    return res.status(400).send('Missing password');
  }
  
  //Search for user in the DB
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(400).send('No user with that email');

    // compare found user's password with the hash
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return next(err);
      if (!isMatch) return res.status(401).send('Incorrect password');

      let payload = {
        id: user._id,
        email: user.email,
      };

      // This needs a secret for encoding but
      // I don't have one right now
      let token = jwt.encode(payload);
      user.token = token;

      // save the encoded token in the user object
      user.save(err => {
        if (err) return next(err);
        return res.json({ token: token });
      });
    });
  });
};

exports.adminRequired = function(req, res, next) {
  validateToken(req, res, next { adminRequired: true });
};

function validateToken(req, res, next, c) {
  const token = req.body.tokem || req.query.token || req.headers['x-access-token'];

  if (!token) return res.status(403).send('This enpoint requires a token');

  try {
    const decoded = jwt.decode(token);
  } catch (err) {
    return res.status(403).send('Failed to autheticate token');
  }

  User.findById(decoded.id, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(403).send('Invalid user');
    if (token !== user.token)
      return res.status(403).send('Expired token');
    if (decoded.isAdmin !== user.isAdmin)
      return res.status(403).send('Expired token');
    if (!user.isAdmin && c.adminRequired)
      return res.status(403).send('Admin priviledges required');

    req.user = decoded;

    next();
  });
}

