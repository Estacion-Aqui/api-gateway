import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';

import { User } from '../models'
import { UserRepository } from '../repositories';

export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.save(req.body)

    return res.status(201).json(user);
  } catch(error) {
    return res.status(422).json(error)
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const users = await userRepository.find()

    return res.status(200).json(users);
  } catch(error) {
    return res.status(404).json(error)
  }
}

export const searchUser = async (req: Request, res: Response) => {
  try {
    const userRepository = getCustomRepository(UserRepository);
    const {username, email} = req.query;
    let foundUser: User = new User();

    if (username) {
      foundUser = await userRepository.findByUsername(String(username));
    } else if (email) {
      foundUser = await userRepository.findByEmail(String(email));
    } else {
      return res.status(404).json({ message: "User not found with this params" })
    }

    return res.status(200).json(foundUser);
  } catch(error) {
    return res.status(404).json(error)
  }
}
