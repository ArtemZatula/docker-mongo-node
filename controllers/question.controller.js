import { Question } from '../models/question.model.js'

export async function getAllWorkspaceQuestions(req, res) {
  try {
    const questions = await Question
      .find({workspace: req.params.workspaceId})
      .populate('tags')
      .exec()
    res.status(200).send(questions);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export async function addQuestion(req, res) {
  try {
    const question = await Question.create({...req.body, workspace: req.params.workspaceId});
    res.status(201).send(question);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export async function updateQuestion(req, res) {
  try {
    Object.assign(req.question, req.body)
    await req.question.save({ runValidators: true })
    res.status(200).send(req.question)
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteQuestion(req, res) {
  try {
    await req.question.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

