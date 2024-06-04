import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    require: [true, 'User must have a username'],
    unique: true
  },
  password: {
    type: String,
    require: [true, 'User must have a password']
  }
});

export const User = model('User', userSchema);