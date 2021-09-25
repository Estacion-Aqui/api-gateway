import express from 'express';

import * as projectController from '../../controller/projectController';

const projectRouter = express.Router({ mergeParams: true });

projectRouter.get("/places", (req, resp) => projectController.getPlaces(req, resp))

projectRouter.get("/travelData", (req, resp) => projectController.getTravelData(req, resp))

projectRouter.post("/reserveSpot", (req, resp) => projectController.reserveSpot(req, resp))

projectRouter.post("/updateData", (req, resp) => projectController.updateData(req, resp))

projectRouter.post("/insertData", (req, resp) => projectController.insertData(req, resp))

export default projectRouter;
