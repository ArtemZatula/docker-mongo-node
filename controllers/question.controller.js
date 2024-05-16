import Workspace from '../models/workspace.model.js';
import Question from '../models/question.model.js';

export async function createQuestion(req, res) {
    try {
        const question = await Question.create({title: req.body.title});
        Workspace.findByIdAndUpdate();
        
        
    } catch(error) {
      res.status(400).json({ status: 'failure' });
    }
}