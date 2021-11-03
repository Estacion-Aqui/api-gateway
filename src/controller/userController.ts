import Bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository, getCustomRepository } from 'typeorm';

import { User } from '../models'
import { UserRepository } from '../repositories';
import * as jwt from '../utils/jwt';

export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const userCustomRepository = getCustomRepository(UserRepository);
    const {email, user, car, plate} = req.body;
    const password = Bcrypt.hashSync(req.body.password, 10);

    const newSpot = userRepository.create({email, user, car, plate, password});

    let foundUser: User = new User();
    if (user) {
      foundUser = await userCustomRepository.findByUsername(String(user));
    } else if (email) {
      foundUser = await userCustomRepository.findByEmail(String(email));
    }

    if(foundUser.id == null){
      const errors = await validate(newSpot);

      if (errors.length === 0) {
        const user = await userRepository.save(req.body);
        return res.status(201).json(user);
      }
      return res.status(422).json(errors);
    }else{
        return res.status(201).json(foundUser);
    }
  } catch(error) {
    return res.status(422).json(error)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const {id, email, user, car, plate} = req.body;

    const newSpot = userRepository.create({id, email, user, car, plate});

    const errors = await validate(newSpot);

    if (errors.length === 0) {
      const user = await userRepository.save(req.body)
      return res.status(201).json(user);
    }

    return res.status(422).json(errors);
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

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const { id } = req.params;

    const foundUser = await userRepository.findOneOrFail(id)

    return res.status(200).json(foundUser);
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

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const token = req.headers['auth'] as string;
    const { userId } = jwt.verify(token) as any;

    const { lastPassword, newPassword, confirmationPassword } = req.body;
    const user = await userRepository.findOneOrFail(userId);

    if (Bcrypt.compareSync(lastPassword, user.password) && newPassword === confirmationPassword) {
        user.password = Bcrypt.hashSync(newPassword, 10);
        userRepository.save(user);
        return res.status(200).json({message: "Password changed with success"})
    }

    return res.status(400).json("your current password is wrong, type again please")
  } catch (error) {
    return res.status(404).json({ message: error })
  }
};

export const checkLogin = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(User);
    const {email} = req.body;

    const password = Bcrypt.hashSync(req.body.password, 10);

    const usData = await userRepository.findOneOrFail({where: { email: email, password: password }});

    return res.status(201).json(usData);
  } catch(error) {
    return res.status(422).json(error)
  }
}
