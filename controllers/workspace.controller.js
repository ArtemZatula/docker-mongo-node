import Workspace from '../models/workspace.model.js';

export async function getAllWorkspaces(req, res) {
  try {
    const userId = req.session.user._id
    const workspaces = await Workspace.find({users:  { $elemMatch: { userId } }})
    res.status(200).json({
      status: 'success',
      results: workspaces.length,
      data: { workspaces }
    })
  } catch(e) {
    res.status(400).json({
      status: 'failure'
    })
  }
}

export async function createWorkspace(req, res) {
  try {
    const ws = {
      name: req.body.name || 'Undefined',
      users: [{
        userId: req.session.user._id,
        role: 'Owner'
      }]
    }
    const workspace = await Workspace.create(ws);
    res.status(200).json({
      status: 'success',
      results: workspaces.length,
      data: { workspaces }
    })
  } catch(e) {
    res.status(400).json({
      status: 'failure'
    })
  }
}