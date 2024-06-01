import {
  deleteQuestion,
  updateQuestion
} from '../controllers/question.controller.js'
import { questionTagRouter } from './question-tag.route.js'
import { validateObjectId } from '../middlewares/validate-object-id.middleware.js'

import { Router } from 'express'

export const questionRouter = Router()

questionRouter.route('/:questionId')
  .all(validateObjectId('questionId'))
  .patch(updateQuestion)
  .delete(deleteQuestion)

questionRouter.use('/:questionId/tags', questionTagRouter)

