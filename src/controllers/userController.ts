import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to create user', error: err });
  }
};