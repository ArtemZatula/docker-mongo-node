import { Router } from 'express'
import {
  addQuestion,
  getAllWorkspaceQuestions,
  deleteQuestion,
  // getQuestion, 
  updateQuestion
} from '../controllers/question.controller.js'

const router = Router({ mergeParams: true })
router.route('/')
  .get(getAllWorkspaceQuestions)
  .post(addQuestion)

router.route('/:questionId')
  // .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion)

export default router