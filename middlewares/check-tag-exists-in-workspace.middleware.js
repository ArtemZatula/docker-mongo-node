import { Question } from "../models/question.model.js";
import { Tag } from "../models/tag.model.js";


export function checkTagExistsInWorkspace() {
  return async (req, res, next) => {
    try {
      const { tagId, questionId } = req.params;
      const tag = await Tag.findById(tagId);
      if (!tag) {
        return res.status(404).send(`No tag with id = ${tagId}`);
      }
      const question = await Question.findById(questionId);
      if (!tag.workspace.equals(question.workspace)) {
        return res.status(404).send(`No tag with id = ${tagId} in workspace ${question.workspace}`);
      }
      req.tag = tag;
      req.question = question;
      next();
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};