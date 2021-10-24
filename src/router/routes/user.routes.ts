import express from 'express';
import * as userController from '../../controller/userController'

const userRouter = express.Router({ mergeParams: true });

userRouter.post("/users", (req, resp) => userController.createUser(req, resp))

userRouter.get("/users", (req, resp) => userController.getUsers(req, resp))

userRouter.get("/users/search", (req, resp) => userController.searchUser(req, resp))

export default userRouter;
