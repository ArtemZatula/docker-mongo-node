import { Schema } from "mongoose";

export const workspaceUserSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'UserId must be provided']
  },
  role: {
    type: String,
    enum: ['Owner', 'Viewer', 'Editor'],
    default: 'Owner'
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Inactive'],
    default: 'Active'
  }
}, { _id: false });