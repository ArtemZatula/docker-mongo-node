import { Schema } from "mongoose";

export const workspaceUserSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Owner', 'Viewer', 'Editor'],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Inactive'],
    required: true
  }
});