import { Schema, model, Types } from 'mongoose'

const questionSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Question must have a title']
  },
  workspace: {
    type: Types.ObjectId,
    ref: 'Workspace',
    required: true
  },
  tags: [{
    type: Types.ObjectId,
    ref: 'Tag',
    required: true
  }]
})

export const Question = model('Question', questionSchema)