import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Place } from '../models'

export const createPlaces = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Place);
    const {type, title, quantitySpots, latitude, longitude} = req.body;

    const newPlace = repo.create({type, title, quantitySpots, latitude, longitude});

    const errors = await validate(newPlace);

    if (errors.length === 0) {
      const createdPlace = await repo.save(newPlace);
      return res.status(201).json(createdPlace);
    }

    return res.status(422).json(errors);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getPlaces = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Place);
    const places = await repo.find();

    return res.status(200).json(places);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getPlaceById = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Place);
    const { id } = req.params;

    const foundPlace = await repo.findOneOrFail(id);

    return res.status(200).json(foundPlace);
  } catch (error) {
    return res.status(404).json(error);
  }
}

export const deletePlaceById = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Place);
    const { id } = req.params;

    await repo.delete(id);

    return res.status(200).json({"message" : "Success"});
  } catch (error) {
    return res.status(404).json(error);
  }
}
