import { Request, Response } from 'express';
import Bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';

import * as jwt from '../utils/jwt'
import { UserRepository } from '../repositories';


export const login = async (req: Request, res: Response) => {
  try {
    const repo = getCustomRepository(UserRepository)
    const { email, password } = req.body;

    const user = await repo.findByEmail(email);

    if (Bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ userId: user.id, email: user.email });

      res.setHeader("token", token);
      res.status(200).json({
        message: 'Authenticated',
        token: token,
      });
    } else {
      throw "Access Unauthorized";
    }

  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.setHeader('token', '');
    res.status(200).json({ message: 'Logged Out'});
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
};
