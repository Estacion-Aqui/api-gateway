import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { createSecureServer } from 'http2';
import { getRepository, MoreThan } from 'typeorm';

import { Spot, SpotHistory, SpotRequest, SpotReserve } from '../models'

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

export const createHistory = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(SpotHistory);
    const {userId, spotId} = req.body;

    const newSpot = repo.create({user:userId, spot:spotId});

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

export const getHistory = async (req: Request, res: Response) => {
  try {
    const repo = getRepository(SpotHistory);

    const { usId } = req.params;

    const allSpots = await repo.find({where: { user: usId }});

    return res.status(200).json(allSpots);
  } catch(error) {
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

    let selectedSpot : Spot = new Spot;
    const invalidSpots = await checkReserves(placeId);

    spotsByPlace.forEach(function(item){
      if(!invalidSpots.includes(item)){
        selectedSpot = item;
        return;
      }
    });

    if(selectedSpot.id == null) {
      return res.status(400).json({message: "No free spots found in this place"})
    }

    await createReserve(selectedSpot);

    return res.status(200).json(selectedSpot);
  } catch(error) {
    return res.status(400).json(error);
  }
}

const createReserve = async(spotsByPlace : Spot) => {
    const repo = getRepository(SpotReserve);

    const newSpot = repo.create({spot:spotsByPlace, place:spotsByPlace.place});

    const errors = await validate(newSpot);

    if (errors.length === 0) {
      await repo.save(newSpot);
    }

}
const checkReserves = async(placeId : String) => {
  const repo = getRepository(SpotReserve);

  let dts = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

  const spotReserve = await repo.find({where: { place: placeId,
       createdAt:  MoreThan(dts) }});

  let spotReserveIdSet : Spot[] = [];
  if (spotReserve.length > 0) {
    spotReserve.forEach(function(item){
      spotReserveIdSet.push(item.spot);
    }, {spotReserveIdSet})
  }
  return spotReserveIdSet;

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
    status = status !== "filled";
    const plate = current_plate;
    console.log(req.body.data);

    // const newSpot = spotRepo.create({id, status, plate});
    const newSpot = spotRepo.create({id, status});

    const errors = await validate(newSpot);

    await spotRepo.save(newSpot);

    if(!status)
      await deleteReserve(newSpot);

    return res.status(200).json({message: "Received this from helix", body: req.body})
  } catch (error) {
    return res.status(400).json(error);
  }
}

const deleteReserve = async (req: Spot) => {
  const repo = getRepository(SpotReserve);
  await repo.delete({spot: req});
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
