import express from 'express';

import ServicesController from '../../controllers/ServicesController';

const serviceController = new ServicesController();

const serviceRouter = express.Router({ mergeParams: true });

serviceRouter.get(
  '/services/',
  serviceController.index
);

serviceRouter.post(
  '/services/',
  serviceController.create
);

serviceRouter.get(
  '/services/:serviceId',
  (req, resp) => serviceController.show(req, resp, req.params.serviceId)
);

serviceRouter.put(
  '/services/:serviceId',
  (req, resp) => serviceController.edit(req, resp, req.params.serviceId)
);

serviceRouter.patch(
  '/services/:serviceId',
  (req, resp) => serviceController.edit(req, resp, req.params.serviceId)
);

serviceRouter.delete(
  '/services/:serviceId',
  (req, resp) => serviceController.delete(req, resp, req.params.serviceId)
);

export default serviceRouter;
