import { Router } from 'express'

import { validateObjectId } from '../middlewares/validate-object-id.middleware.js'
import { addTagToQuestion, removeTagFromQuestion } from '../controllers/question-tag.controller.js'
import { checkTagExistsInWorkspace } from '../middlewares/check-tag-exists-in-workspace.middleware.js'


export const questionTagRouter = Router({ mergeParams: true })
questionTagRouter.route('/:tagId')
  .all(
    validateObjectId('tagId'),
    checkTagExistsInWorkspace()
  )
  .post(addTagToQuestion)
  .delete(removeTagFromQuestion)