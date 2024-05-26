import { Router } from 'express'
import {
  addTagToWorkspace,
  getAllWorkspaceTags
} from '../controllers/tag.controller.js'

export const tagRouter = Router({ mergeParams: true })
tagRouter.route('/')
  .get(getAllWorkspaceTags)
  .post(addTagToWorkspace)