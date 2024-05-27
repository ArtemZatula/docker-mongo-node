import Workspace from '../models/workspace.model.js'
import Tag from '../models/tag.model.js'

export async function addTagToWorkspace(req, res) {
  try {
    const tag = await Tag.create({...req.body, workspace: req.params.workspaceId});
    res.status(201).send(tag);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function addTagQuestion(req, res) {
  try {
    const { workspaceId } = req.params;
    const workspace = await Workspace.findById(workspaceId);
    const tag = await Tag.create(req.body);
    workspace.tags.push(tag._id);
    await workspace.save();
    res.status(201).send(tag);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getAllWorkspaceTags(req, res) {
  try {
    const tags = await Tag.find({workspace: req.params.workspaceId});
    res.status(200).send(tags);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export async function updateTag(req, res) {
  try {
    const tagToUpdate = await Question.findByIdAndUpdate(req.params.tagId, {...req.body}, {
      new: true,
      runValidators: true
    });
    res.status(200).send(tagToUpdate);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export async function deleteTagFromWorkspace(req, res) {
  try {
    const { workspaceId, questionId } = req.params
    await Question.findByIdAndDelete(questionId)
    const workspace = await Workspace.findByIdAndUpdate(workspaceId, {$pull: {questions: questionId}});
    res.status(204).send(workspace)
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export async function removeTagFromQuestion(req, res) {
  try {
    const { workspaceId, tagId } = req.params
    await Question.findByIdAndDelete(questionId)
    const workspace = await Workspace.findByIdAndUpdate(workspaceId, {$pull: {questions: questionId}});
    res.status(204).send(workspace)
  } catch (error) {
    res.status(500).send(error.message);
  }
};