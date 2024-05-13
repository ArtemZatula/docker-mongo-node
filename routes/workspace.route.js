import { Router } from 'express';
import { createWorkspace, getAllWorkspaces } from '../controllers/workspace.controller.js';

const router = Router();

router.route('/')
  .get(getAllWorkspaces)
  .post(createWorkspace)

// router.route('/:id')
//   .get(protect, postController.getOnePost)
//   .patch(protect, postController.updatePost)
//   .delete(protect, postController.deletePost)

export default router