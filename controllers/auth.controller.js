const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {
  const {username, password} = req.body;
  if (!username || !password) {
    return res.status(401).json({
      status: 'failure',
      message: 'Username or password cannot be empty'
    });
  }
  const hashpass = await bcrypt.hash(password, 12);
  try {
    const newUser = await User.create({username, password: hashpass});
    res.status(201).json({
      status: 'success',
      data: { user: newUser }
    })
  } catch(e) {
    res.status(400).json({
      status: 'failure'
    });
  }
}

exports.login = async (req, res) => {
  const {username, password} = req.body;
  try {
    const user = await User.findOne({username});
    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: 'user not found'
      });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      req.session.user = user;
      req.session.save();
      res.status(201).json({
        status: 'success'
      })
    } else {
      res.status(400).json({
        status: "failure",
        message: "Incorrect Username or Password"
      });
    }
  } catch(e) {
    res.status(400).json({
      status: 'failure'
    });
  }
}