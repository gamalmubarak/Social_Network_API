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
export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find()
      .populate('thoughts')
      .populate('friends');
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: 'Failed to retrieve users', error: err });
    }
  };
  export const getUserById = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: 'Failed to retrieve user', error: err });
    }
  };
  export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: 'Failed to update user', error: err });
    }
  };
  
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Remove associated thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.status(200).json({ message: 'User and associated thoughts deleted' });
      return;
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete user', error: err });
      return;
    }
  };
  export const addFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
      return;
    } catch (err) {
      res.status(500).json({ message: 'Failed to add friend', error: err });
      return;
    }
  };