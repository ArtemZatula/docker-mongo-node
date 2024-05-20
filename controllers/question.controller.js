import Workspace from '../models/workspace.model.js'
import Question from '../models/question.model.js'

export async function getAllWorkspaceQuestions(req, res) {
  try {
    const workspace = await Workspace.findById(req.params.workspaceId)
    const questionIds = workspace.questions
    const questions = await Question.find({_id: { $in : questionIds } });
    res.status(200).send(questions);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export async function addQuestion(req, res) {
  try {
    const { workspaceId } = req.params;
    const workspace = await Workspace.findById(workspaceId);
    const question = await Question.create(req.body);
    workspace.questions.push(question._id);
    await workspace.save();
    res.status(201).send(workspace);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export async function updateQuestion(req, res) {
  try {
    const questionToUpdate = await Question.findByIdAndUpdate(req.params.questionId, {...req.body}, {
      new: true,
      runValidators: true
    });
    res.status(200).send(questionToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export async function deleteQuestion(req, res) {
  try {
    const { workspaceId, questionId } = req.params
    await Question.findByIdAndDelete(questionId)
    const workspace = await Workspace.findByIdAndUpdate(workspaceId, {$pull: {questions: questionId}});
    res.status(204).send(workspace)
  } catch (error) {
    res.status(500).send(error.message);
  }
};
