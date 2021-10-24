import express from 'express';

import { authMiddleware } from '../../middlewares/authMiddleware';
import * as authController from '../../controller/authController';

const authRouter = express.Router({ mergeParams: true });

authRouter.get('/', (request, response) => {
  return response.json({ message: 'Hello from the new world!'});
});

authRouter.get('/test/authenticated', authMiddleware, (request, response) => {
  return response.json({ message: 'Route Authenticated!'});
})

authRouter.post('/login', (req, resp) => authController.login(req, resp));

authRouter.post('/logout', (req, resp) => authController.logout(req, resp));

export default authRouter;
