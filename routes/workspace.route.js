import { Router } from 'express'

import {
  createWorkspace,
  getAllWorkspaces,
  updateWorkspace,
  deleteWorkspace,
  getWorkspace
} from '../controllers/workspace.controller.js'
import { questionRouter } from './question.route.js'
import { workspaceTagRouter } from './workspace-tag.route.js'
import { validateObjectId } from '../middlewares/validate-object-id.middleware.js'

export const workspaceRouter = Router()

workspaceRouter.route('/')
  .get(getAllWorkspaces)
  .post(createWorkspace)

workspaceRouter.route('/:workspaceId')
  .all(validateObjectId('workspaceId'))
  .get(getWorkspace)
  .patch(updateWorkspace)
  .delete(deleteWorkspace)

workspaceRouter.use('/:workspaceId/questions', questionRouter)
workspaceRouter.use('/:workspaceId/tags', workspaceTagRouter)