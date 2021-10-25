import express from 'express';
import * as sectorController from '../../controller/sectorController'

const sectorsRouter = express.Router({ mergeParams: true });

sectorsRouter.post("/sectors", (req, resp) => sectorController.createSector(req, resp))

sectorsRouter.put("/sectors/:id", (req, resp) => sectorController.updateSector(req, resp))

sectorsRouter.get("/sectors", (req, resp) => sectorController.getSector(req, resp))

sectorsRouter.get("/sectors/:id", (req, resp) => sectorController.getSectorById(req, resp))

sectorsRouter.delete("/sectors/:id", (req, resp) => sectorController.deleteSectorById(req, resp))

export default sectorsRouter;
