import express from 'express';
import * as areaController from '../../controller/areaController'

const areasRouter = express.Router({ mergeParams: true });

areasRouter.post("/areas", (req, resp) => areaController.createArea(req, resp))

areasRouter.put("/areas/:id", (req, resp) => areaController.updateArea(req, resp))

areasRouter.get("/areas", (req, resp) => areaController.getArea(req, resp))

areasRouter.get("/areas/:id", (req, resp) => areaController.getAreaById(req, resp))

areasRouter.delete("/areas/:id", (req, resp) => areaController.deleteAreaById(req, resp))

export default areasRouter;
