import express from 'express';
import * as placeController from '../../controller/placeController'

const placesRouter = express.Router({ mergeParams: true });

placesRouter.post("/places", (req, resp) => placeController.createPlaces(req, resp))

placesRouter.get("/places", (req, resp) => placeController.getPlaces(req, resp))

placesRouter.get("/places/:id", (req, resp) => placeController.getPlaceById(req, resp))

placesRouter.delete("/places/:id", (req, resp) => placeController.deletePlaceById(req, resp))

export default placesRouter;
