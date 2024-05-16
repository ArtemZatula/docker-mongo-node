import { Schema, model } from 'mongoose'
import { workspaceUserSchema } from './workspace-user.model.js';

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Workspace must have a name']
  },
  users: [workspaceUserSchema],
  questions: [String] }, { timestamps: true }
);

export default model('Workspace', workspaceSchema);