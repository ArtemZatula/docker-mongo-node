import express from 'express'

import {
  getAllPosts,
  createPost, 
  getOnePost,
  updatePost, 
  deletePost
} from '../controllers/post.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getAllPosts)
  .post(protect, createPost)

router.route('/:id')
  .get(protect, getOnePost)
  .patch(protect, updatePost)
  .delete(protect, deletePost)

export default router;