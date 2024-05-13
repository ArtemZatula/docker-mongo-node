import Workspace from '../models/workspace.model.js';

export async function getAllWorkspaces(req, res) {
  try {
    const workspaces = await Workspace.find();
    res.status(200).json({
      status: 'success',
      results: workspaces.length,
      data: {
        workspaces
      }
    })
  } catch(e) {
    res.status(400).json({
      status: 'failure'
    })
  }
}

export async function createWorkspace(req, res) {
  console.log(req)
  try {
    const workspace = await Workspace.create(req.body);
    // res.status(200).json({
    //   status: 'success',
    //   results: workspaces.length,
    //   data: {
    //     workspaces
    //   }
    // })
  } catch(e) {
    res.status(400).json({
      status: 'failure'
    })
  }
}