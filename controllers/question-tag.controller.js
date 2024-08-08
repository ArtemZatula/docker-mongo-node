import { Question } from "../models/question.model.js";


export async function addTagToQuestion(req, res) {
  try {
    const { question, tag } = req;
    const tagInQuestion = question.tags.find(t => t._id.equals(tag._id));

    if (tagInQuestion) {
      return res.status(201).send(question)
    }

    question.tags.push(tag._id)
    await question.save()
    res.status(201).send(question)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function removeTagFromQuestion(req, res) {
  try {
    const { question, tag } = req;
    const updated = await Question.updateOne(
      { _id: question._id },
      { $pull: { tags: tag._id } }
    );
    if (updated.nModified === 0) {
      return res.status(400).send('Tag was not removed');
    }
    res.status(204).send(updated)
  } catch (error) {
    res.status(500).send(error.message)
  }
};