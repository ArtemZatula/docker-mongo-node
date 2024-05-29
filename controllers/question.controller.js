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
    const questionToUpdate = await Question.findByIdAndUpdate(
      req.params.questionId, 
      {...req.body}, 
      { new: true,
        runValidators: true }
    );
    res.status(200).send(questionToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export async function deleteQuestion(req, res) {
  try {
    await Question.findByIdAndDelete(req.params.questionId)
    res.status(204)
  } catch (error) {
    res.status(500).send(error.message);
  }
};

