import { Router } from 'express'

import { validateObjectId } from '../middlewares/validate-object-id.middleware.js'
import { addTagToQuestion, removeTagFromQuestion } from '../controllers/question-tag.controller.js'

export const questionTagRouter = Router({ mergeParams: true })
questionTagRouter.route('/:tagId')
  .all(validateObjectId('tagId'))
  .post(addTagToQuestion)
  .delete(removeTagFromQuestion)