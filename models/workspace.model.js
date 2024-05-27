import { Schema, Types, model } from 'mongoose'
import { workspaceUserSchema } from './workspace-user.model.js';

const workspaceSchema = new Schema({
  name: {
    type: String,
    default: 'Undefined'
  },
  users: [workspaceUserSchema],
}, { timestamps: true });

export default model('Workspace', workspaceSchema);