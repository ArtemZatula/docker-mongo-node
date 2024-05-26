import { Schema, model } from 'mongoose'

const tagSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Tag must have a title'],
    unique: true
  },
})

export default model('Tag', tagSchema)