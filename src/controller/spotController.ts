import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Spot, SpotRequest } from '../models'

export const createSpot = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Spot);
    const {place, title, status, sector, sensorId} = req.body;

    const newSpot = repo.create({place, title, status, sector, sensorId});

    const errors = await validate(newSpot);

    if (errors.length === 0) {
      const createdSpot = await repo.save(newSpot);
      return res.status(201).json(createdSpot);
    }

    return res.status(422).json(errors);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const getSpots = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Spot);
    const spots = await repo.find();

    return res.status(200).json(spots);
  } catch(error) {
    return res.status(400).json(error);
  }
}

export const getFreeSpot = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Spot);

    const { placeId } = req.params;

    const spotsByPlace = await repo.find({where: { place: placeId, status: true }});

    if (spotsByPlace.length <= 0) {
      return res.status(400).json({message: "No free spots found in this place"})
    }

    return res.status(200).json(spotsByPlace[0]);
  } catch(error) {
    return res.status(400).json(error);
  }
}

export const getSpotById = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Spot);
    const { id } = req.params;

    const foundSpot = await repo.findOneOrFail(id);

    return res.status(200).json(foundSpot);
  } catch(error) {
    return res.status(400).json(error);
  }
}

export const getSpotsByPlace = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Spot);
    const { placeId } = req.params;

    const spotsByPlace = await repo.find({where: { place: placeId }});

    return res.status(200).json(spotsByPlace);
  } catch(error) {
    return res.status(400).json(error);
  }
}

export const createSolicitation = async (req: Request, res: Response) => {
  try {
    const spotRepo = getRepository(Spot);
    const spotRequestRepo = getRepository(SpotRequest);
    const { placeId } = req.params;

    const freeSpots = await spotRepo.find({
      where: {
        status: true,
        place: placeId
      },
    });

    if (freeSpots.length <= 0) {
      return res.status(400).json({message: "No free spots found in this place"})
    }

    const createdSolicitation = spotRequestRepo.save({ spot: freeSpots[0], status: "reserved" })

    return res.status(201).json({
      message: 'Solicitação Criada com Sucesso!',
      body: createdSolicitation,
    });
  } catch(error) {
    return res.status(400).json(error);
  }
}

export const helixReserveSpot = async (req: Request, res: Response) => {
  try {
    const spotRepo = getRepository(Spot);
    let {id, current_plate, status} = req.body.data;
    status = status === "filled";
    const plate = current_plate;
    console.log(req.body.data);

    // const newSpot = spotRepo.create({id, status, plate});
    const newSpot = spotRepo.create({id, status});

    const errors = await validate(newSpot);

    await spotRepo.save(newSpot);

    return res.status(200).json({message: "Received this from helix", body: req.body})
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const confirmSpot = async (req: Request, res: Response) => {
  try {
    const responseData = {
      "parkId": "1",
      "spotId": "A22",
      "usId": ""
    }

    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const cancelSpot = async (req: Request, res: Response) => {
  try {
    const responseData = {
      "parkId": "1",
      "spotId": "A22",
      "usId": ""
    }

    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(400).json(error);
  }
}

export const updateSpot = async (req: Request, res: Response, reserved: Boolean) => {
  //const client = await pool.connect();
  const body = req.body;

  //const response = await client.query(
  //  'UPDATE Spots SET Reserved = $2 WHERE Id = $1',
  //  [spotId, reserved],
  //);

  return res.status(200).send({ message: 'Vaga atualizada com Sucesso!', body });
}

export const checkStatusSpot = async (req: Request, res: Response) => {
  const responseData = {
      "parkId": "1",
      "spotId": "A22",
      "usId": ""
  }

  return res.status(200).json(responseData);
}


export const deleteSpotById = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(Spot);
    const { id } = req.params;

    await repo.delete(id);

    return res.status(200).json({"message" : "Success"});
  } catch (error) {
    return res.status(404).json(error);
  }
}
