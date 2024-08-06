import { Question } from "../models/question.model.js";


export function checkQuestionExists() {
  return async (req, res, next) => {
    try {
      const { questionId } = req.params;
      const question = await Question.findById(questionId)
      if (!question) {
        return res.status(404).send(`No question with id = ${questionId}`);
      }
      req.question = question;
      next();
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};
