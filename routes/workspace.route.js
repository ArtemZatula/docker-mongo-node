import { Router } from 'express';
import {
  createWorkspace,
  getAllWorkspaces,
  updateWorkspace,
  deleteWorkspace,
  getWorkspace
} from '../controllers/workspace.controller.js';

const router = Router();

router.route('/')
  .get(getAllWorkspaces)
  .post(createWorkspace)

router.route('/:id')
  .get(getWorkspace)
  .patch(updateWorkspace)
  .delete(deleteWorkspace)

export default router