import { Schema, model } from 'mongoose'
import { workspaceUserSchema } from './workspace-user.model.js';

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: [workspaceUserSchema],
  questions: [String]
});

export default model('Workspace', workspaceSchema);