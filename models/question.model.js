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
  tags: []
})

export default model('Question', questionSchema)