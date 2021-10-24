import express from 'express';

// import * as projectController from '../../controller/projectController';

const projectRouter = express.Router({ mergeParams: true });

// projectRouter.post("/reserveSpot/", (req, resp) => projectController.updateSpot(req, resp, true))

// projectRouter.post("/freeSpot/", (req, resp) => projectController.updateSpot(req, resp, false))

// projectRouter.get("/travelData", (req, resp) => projectController.getTravelData(req, resp))

// projectRouter.get("/updateData", (req, resp) => projectController.updateData(req, resp))

// projectRouter.get("/insertData", (req, resp) => projectController.insertData(req, resp))

// projectRouter.get("/checkStatusSpot", (req, resp) => projectController.checkStatusSpot(req, resp))

projectRouter.get("/test", (req, resp) => {
  console.log("OK: " + req);

  return resp.status(200).json({msg: "Ok"})
})

export default projectRouter;
