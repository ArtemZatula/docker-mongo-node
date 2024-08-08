import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js'

export async function signUp(req, res) {
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

export async function login(req, res) {
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

export function logout(req, res) {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({
        status: 'failure',
        message: 'Failed to log out'
      });
    }

    res.clearCookie('connect.sid');
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    });
  });
}