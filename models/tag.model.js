import { Schema, model, Types } from 'mongoose'

const tagSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Tag must have a title'],
    unique: true
  },
  workspace: {
    type: Types.ObjectId,
    ref: 'Workspace',
    required: true
  }
})

export const Tag = model('Tag', tagSchema)