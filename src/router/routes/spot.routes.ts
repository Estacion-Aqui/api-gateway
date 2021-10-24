import express from 'express';
import * as spotController from '../../controller/spotController'

const spotsRouter = express.Router({ mergeParams: true });

spotsRouter.post("/spots", (req, resp) => spotController.createSpot(req, resp))

spotsRouter.get("/spots", (req, resp) => spotController.getSpots(req, resp))

spotsRouter.get("/spots/:id", (req, resp) => spotController.getSpotById(req, resp))

spotsRouter.get("/spots/place/:placeId", (req, resp) => spotController.getSpotsByPlace(req, resp))

spotsRouter.post("/spots/solicitation/:placeId", (req, resp) => spotController.createSolicitation(req, resp))

spotsRouter.post("/spots/reserveSpot", (req, resp) => spotController.helixReserveSpot(req, resp))

spotsRouter.put("/spots/confirmSpot/:id", (req, resp) => spotController.confirmSpot(req, resp))

spotsRouter.delete("/spots/cancelSpot/:id", (req, resp) => spotController.cancelSpot(req, resp))

export default spotsRouter;
