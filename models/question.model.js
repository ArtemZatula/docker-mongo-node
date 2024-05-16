import { Schema, model } from 'mongoose'

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Question must have a title']
  },
  answers: [],
  tags: []
})

export default model('Question', questionSchema)