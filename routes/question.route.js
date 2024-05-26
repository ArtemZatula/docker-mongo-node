import { Router } from 'express'
import {
  addQuestion,
  getAllWorkspaceQuestions,
  deleteQuestion,
  // getQuestion, 
  updateQuestion
} from '../controllers/question.controller.js'

export const questionRouter = Router({ mergeParams: true })
questionRouter.route('/')
  .get(getAllWorkspaceQuestions)
  .post(addQuestion)

questionRouter.route('/:questionId')
  // .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion)

