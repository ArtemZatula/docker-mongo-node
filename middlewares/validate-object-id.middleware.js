import { Types } from 'mongoose';

export function validateObjectId(paramName) {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).send(`Invalid ${paramName} ID`);
    }
    next();
  }
};
