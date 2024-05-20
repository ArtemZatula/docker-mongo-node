import { Router } from 'express'

import {
  createWorkspace,
  getAllWorkspaces,
  updateWorkspace,
  deleteWorkspace,
  getWorkspace
} from '../controllers/workspace.controller.js'
import questionRouter from './question.route.js'

const router = Router()

router.route('/')
  .get(getAllWorkspaces)
  .post(createWorkspace)

router.route('/:workspaceId')
  .get(getWorkspace)
  .patch(updateWorkspace)
  .delete(deleteWorkspace)

router.use('/:workspaceId/questions', questionRouter)

export default router