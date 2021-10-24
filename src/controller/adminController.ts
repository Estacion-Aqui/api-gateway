import Bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Admin } from '../models'
import * as jwt from '../utils/jwt';

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const adminRepository = getRepository(Admin);
    const {email, user, role, places} = req.body;
    const password = Bcrypt.hashSync(req.body.password, 10);

    const newSpot = adminRepository.create({email, user, password, role, places});

    const errors = await validate(newSpot);

    if (errors.length === 0) {
      const user = await adminRepository.save(req.body)
      return res.status(201).json(user);
    }

    return res.status(422).json(errors);
  } catch(error) {
    return res.status(422).json(error)
  }
}

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const adminRepository = getRepository(Admin);
    const users = await adminRepository.find()

    return res.status(200).json(users);
  } catch(error) {
    return res.status(404).json(error)
  }
}

export const getAdminById = async (req: Request, res: Response) => {
  try {
    const adminRepository = getRepository(Admin);
    const { id } = req.params;

    const foundUser = await adminRepository.findOneOrFail(id)

    return res.status(200).json(foundUser);
  } catch(error) {
    return res.status(404).json(error)
  }
}

export const searchAdmin = async (req: Request, res: Response) => {
  try {
    const adminRepository = getRepository(Admin);
    const {username, email} = req.query;
    let foundUser: Admin = new Admin();

    if (username) {
      foundUser = await adminRepository.findOneOrFail({where: {user: username}});
    } else if (email) {
      foundUser = await adminRepository.findOneOrFail({where: {email}});
    } else {
      return res.status(404).json({ message: "Admin not found with this params" })
    }

    return res.status(200).json(foundUser);
  } catch(error) {
    return res.status(404).json(error)
  }
}

export const changePassword = async (req: Request, res: Response) => {
  try {
    const adminRepository = getRepository(Admin);
    const token = req.headers['auth'] as string;
    const { userId } = jwt.verify(token) as any;

    const { lastPassword, newPassword, confirmationPassword } = req.body;
    const user = await adminRepository.findOneOrFail(userId);

    if (Bcrypt.compareSync(lastPassword, user.password) && newPassword === confirmationPassword) {
        user.password = Bcrypt.hashSync(newPassword, 10);
        adminRepository.save(user);
        return res.status(200).json({message: "Password changed with success"})
    }

    return res.status(400).json("Your current password is wrong, type again please")
  } catch (error) {
    return res.status(404).json({ message: error })
  }
};
