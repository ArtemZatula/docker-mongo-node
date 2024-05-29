import { Router } from 'express'
import {
  addQuestion,
  getAllWorkspaceQuestions,
  deleteQuestion,
  // getQuestion, 
  updateQuestion
} from '../controllers/question.controller.js'
import { questionTagRouter } from './question-tag.route.js'
import { validateObjectId } from '../middlewares/validate-object-id.middleware.js'

export const questionRouter = Router({ mergeParams: true })
questionRouter.route('/')
  .get(getAllWorkspaceQuestions)
  .post(addQuestion)

questionRouter.route('/:questionId')
  .all(validateObjectId('questionId'))
  // .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion)

questionRouter.use('/:questionId/tags', questionTagRouter)

