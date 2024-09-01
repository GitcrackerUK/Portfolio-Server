const User = require('../models/user.model.js')
const router = require('express').Router()

router.route('/').post((req, res) => {
  const { user, password, email } = req.body;

  User.findOne({ user: user }, (err, name) => {
    if (err) {
      console.log(err);
      return res.send({
        route: 'register',
        error: err,
      });
    }

    if (name) {
      return res.send({
        message: 'user already registered',
        user: name.user,
        calendar: name.calendar.length,
      });
    }

    const newUser = new User({
      user,
      password,
      email,
      calendar: [],
    });
    
    newUser.save((error) => {
      if (error) {
        return res.send({
          error: error.name,
          message: error.message,
        });
      }

      return res.send({ message: 'User Registered' });
    });
  });
});


module.exports = router