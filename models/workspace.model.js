import { Schema, model } from 'mongoose'

const workspaceSchema = new Schema({
  name: String,
  users: [{
    userId: String,
    role: {
      type: String,
      enum: ['Owner', 'Viewer', 'Editor']
    }
  }]
});

export default model('Workspace', workspaceSchema);