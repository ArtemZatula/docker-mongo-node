import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  title: {
    type: String,
    require: [true, 'Post must have a title']
  },
  body: {
    type: String,
    require: [true, 'Post must have a body']
  },
});

export default model('Post', postSchema);