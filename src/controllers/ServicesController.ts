import { Request, Response } from "express";
import { ServiceModel } from "../models/services.schema";

export default class ServicesController {
  async index(req: Request, resp: Response) {
    const services = await ServiceModel.find().populate('routes');

    return resp.status(200).json(services);
  }

  async show(req: Request, resp: Response, serviceId: string) {
    try {
      const organization = await ServiceModel.findById(serviceId).populate('routes').orFail(Error);

      return resp.status(200).json(organization);
    } catch (error) {
      console.log(error);

      return resp.status(404).json({message: `error: ${error}`})
    }
  }

  async create(req: Request, resp: Response) {
    try {
      const service = await ServiceModel.create({
        ...req.body
      });

      return resp.status(201).json(service);
    } catch (error) {
      console.log(error);

      return resp.status(422).json({message: `error: ${error}`})
    }
  }

  async edit(req: Request, resp: Response, serviceId: string) {
    try {
      const service = await ServiceModel
        .findById(serviceId)
        .orFail(Error);

      Object.assign(service, { ...req.body })

      service.save();

      return resp.status(201).json(service);
    } catch (error) {
      console.log(error);

      return resp.status(400).json({message: `error: ${error}`})
    }
  }

  async delete(req: Request, resp: Response, serviceId: string) {
    try {
      const service = await ServiceModel.findByIdAndDelete(serviceId).orFail(Error);

      return resp.status(200).json(service);
    } catch (error) {
      console.log(error);

      return resp.status(400).json({message: `error: ${error}`})
    }
  }

}