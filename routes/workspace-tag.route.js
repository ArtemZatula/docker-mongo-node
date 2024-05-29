import { Router } from 'express'
import {
  addTagToWorkspace,
  getAllTagsFromWorkspace,
  deleteTagFromWorkspace
} from '../controllers/workspace-tag.controller.js'

export const workspaceTagRouter = Router({ mergeParams: true })

workspaceTagRouter.route('/')
  .get(getAllTagsFromWorkspace)
  .post(addTagToWorkspace)

workspaceTagRouter.route('/:tagId')
  .delete(deleteTagFromWorkspace)