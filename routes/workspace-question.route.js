import { Router } from 'express'
import {
  addQuestion,
  getAllWorkspaceQuestions
} from '../controllers/question.controller.js'

export const workspaceQuestionRouter = Router({ mergeParams: true })
workspaceQuestionRouter.route('/')
  .get(getAllWorkspaceQuestions)
  .post(addQuestion)