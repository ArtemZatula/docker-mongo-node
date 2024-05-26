import { Schema, Types, model } from 'mongoose'
import { workspaceUserSchema } from './workspace-user.model.js';

const workspaceSchema = new Schema({
  name: {
    type: String,
    default: 'Undefined'
  },
  users: [workspaceUserSchema],
  questions: [{
    type: Types.ObjectId,
    ref: 'Question'
  }],
  tags: [{
    type: Types.ObjectId,
    ref: 'Tag'
  }]
}, { timestamps: true }

);

export default model('Workspace', workspaceSchema);