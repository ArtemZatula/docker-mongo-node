import { Question } from '../models/question.model.js'
import Tag from '../models/tag.model.js'

export async function addTagToWorkspace(req, res) {
  try {
    const tag = await Tag.create({...req.body, workspace: req.params.workspaceId});
    res.status(201).send(tag);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getAllTagsFromWorkspace(req, res) {
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
    const { tagId } = req.params;
    await Tag.findByIdAndDelete(tagId);
    await Question.updateMany(
      { tags: tagId },
      { $pull: { tags: tagId } }
    );
    res.status(204)
  } catch (error) {
    res.status(500).send(error.message);
  }
};
