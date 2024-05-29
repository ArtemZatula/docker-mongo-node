import { Question } from "../models/question.model.js";

export async function addTagToQuestion(req, res) {
  try {
    const { questionId, tagId } = req.params
    const question = await Question.findById(questionId)
    question.tags.push(tagId)
    await question.save()
    res.status(201).send(question)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function removeTagFromQuestion(req, res) {
  try {
    const {questionId, tagId} = req.params
    const question = await Question.findByIdAndUpdate(questionId, {$pull: {tags: tagId}})
    res.status(204).send(question)
  } catch (error) {
    res.status(500).send(error.message)
  }
};