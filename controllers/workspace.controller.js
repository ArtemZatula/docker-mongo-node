import Workspace from '../models/workspace.model.js';

export async function getAllWorkspaces(req, res) {
  try {
    const userId = req.session.user._id
    const workspaces = await Workspace.find({users: { $elemMatch: { userId } }})
    res.status(200).json({
      status: 'success',
      results: workspaces.length,
      data: { workspaces }
    })
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error
    })
  }
}

export async function getWorkspace(req, res) {
  try {
    const userId = req.session.user._id
    const workspaces = await Workspace.find({users:  { $elemMatch: { userId } }})
    res.status(200).json({
      status: 'success',
      results: workspaces.length,
      data: { workspaces }
    })
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error
    })
  }
}

export async function createWorkspace(req, res) {
  try {
    const ws = {
      name: req.body.name,
      users: [{
        userId: req.session.user._id,
        role: 'Owner',
        status: 'Active'
      }]
    }
    const workspace = await Workspace.create(ws);
    res.status(200).json({
      status: 'success',
      data: workspace
    })
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error
    })
  }
}

export async function updateWorkspace(req, res) {
  try {
    const workspace = await Workspace.findByIdAndUpdate(req.params.id, {...req.body},  {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: workspace
    })
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error
    })
  }
}

export async function deleteWorkspace(req, res) {
  try {
    await Workspace.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
    })
  } catch(error) {
    res.status(400).json({
      status: 'failure',
      message: error
    })
  }
}
