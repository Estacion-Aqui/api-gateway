import express from 'express';

import * as projectController from '../../controller/projectController';

const projectRouter = express.Router({ mergeParams: true });

projectRouter.get("/places", (req, resp) => projectController.getPlaces(req, resp))

projectRouter.get("/travelData", (req, resp) => projectController.getTravelData(req, resp))

projectRouter.post("/reserveSpot", (req, resp) => projectController.reserveSpot(req, resp))

projectRouter.post("/updateData", (req, resp) => projectController.updateData(req, resp))

projectRouter.post("/insertData", (req, resp) => projectController.insertData(req, resp))

projectRouter.get("/checkLogin", (req, resp) => projectController.checkLogin(req, resp))

projectRouter.get("/confirmSpot", (req, resp) => projectController.confirmSpot(req, resp))

projectRouter.post("/cancelSpot", (req, resp) => projectController.cancelSpot(req, resp))

projectRouter.post("/checkStatusSpot", (req, resp) => projectController.checkStatusSpot(req, resp))

export default projectRouter;
