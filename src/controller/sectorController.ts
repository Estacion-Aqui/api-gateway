import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Sector } from '../models'

export const createSector = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Sector);
    const {name, area, code} = req.body;

    const newSector = repo.create({name, area, code});

    const errors = await validate(newSector);

    if (errors.length === 0) {
      const createdSector = await repo.save(newSector);
      return res.status(201).json(createdSector);
    }

    return res.status(422).json(errors);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const updateSector = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Sector);
    const { id } = req.params;
    const {name, area, code} = req.body;

    const newSector = repo.create({name, area, code});

    const errors = await validate(newSector);

    if (errors.length === 0) {
      const createdSector = await repo.save(newSector);
      return res.status(201).json(createdSector);
    }

    return res.status(422).json(errors);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getSector = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Sector);
    const sectors = await repo.find();

    return res.status(200).json(sectors);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getSectorById = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Sector);
    const { id } = req.params;

    const foundSector = await repo.findOneOrFail(id);

    return res.status(200).json(foundSector);
  } catch (error) {
    return res.status(404).json(error);
  }
}

export const deleteSectorById = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Sector);
    const { id } = req.params;

    await repo.delete(id);

    return res.status(200).json({"message" : "Success"});
  } catch (error) {
    return res.status(404).json(error);
  }
}
