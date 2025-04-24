import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

interface ThoughtParams {
  id: string;
  thoughtId: string;
  reactionId: string;
}

interface ThoughtBody {
  thoughtText?: string;
  username?: string;
  userId?: string;
}


export const createThought = async (req: Request<{}, {}, ThoughtBody>, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { thoughts: thought._id },
    });
    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create thought', error: err });
  }
};
