import { Router } from 'express'

import {
  deleteQuestion,
  updateQuestion
} from '../controllers/question.controller.js'
import { questionTagRouter } from './question-tag.route.js'
import { validateObjectId } from '../middlewares/validate-object-id.middleware.js'
import { checkQuestionExists } from '../middlewares/check-question-exists.middleware.js'

export const questionRouter = Router()
questionRouter.route('/:questionId')
  .all(validateObjectId('questionId'))
  .all(checkQuestionExists())
  .patch(updateQuestion)
  .delete(deleteQuestion)
questionRouter.use('/:questionId/tags', questionTagRouter)

