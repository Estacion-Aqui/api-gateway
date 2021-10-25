import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Area } from '../models'

export const createArea = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Area);
    const {name, place, code} = req.body;

    const newArea = repo.create({name, place, code});

    const errors = await validate(newArea);

    if (errors.length === 0) {
      const createdArea = await repo.save(newArea);
      return res.status(201).json(createdArea);
    }

    return res.status(422).json(errors);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const updateArea = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Area);
    const { id } = req.params;
    const {name, place, code} = req.body;

    const newArea = repo.create({id, name, place, code});

    const errors = await validate(newArea);

    if (errors.length === 0) {
      const createdArea = await repo.save(newArea);
      return res.status(200).json(createdArea);
    }

    return res.status(422).json(errors);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getArea = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Area);
    const areas = await repo.find();

    return res.status(200).json(areas);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getAreaById = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Area);
    const { id } = req.params;

    const foundArea = await repo.findOneOrFail(id);

    return res.status(200).json(foundArea);
  } catch (error) {
    return res.status(404).json(error);
  }
}

export const deleteAreaById = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Area);
    const { id } = req.params;

    await repo.delete(id);

    return res.status(200).json({"message" : "Success"});
  } catch (error) {
    return res.status(404).json(error);
  }
}
