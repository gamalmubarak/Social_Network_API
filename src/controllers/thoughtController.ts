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
export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve thoughts', error: err });
    }
  };
  
  export const getThoughtById = async (req: Request<ThoughtParams>, res: Response) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      return res.status(200).json(thought);
    } catch (err) {
      return res.status(500).json({ message: 'Failed to retrieve thought', error: err });
    }
  };
  export const updateThought = async (req: Request<ThoughtParams, {}, ThoughtBody>, res: Response) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      return res.status(200).json(thought);
    } catch (err) {
      return res.status(500).json({ message: 'Failed to update thought', error: err });
    }
  };
  
