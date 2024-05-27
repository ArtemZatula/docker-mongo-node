import { Schema, model, Types } from 'mongoose'

const answerSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Answer must have a description']
  },
  question: {
    type: Types.ObjectId,
    ref: 'Question',
    required: true
  }
})

export default model('Answer', answerSchema)