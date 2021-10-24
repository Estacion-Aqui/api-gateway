import express from 'express';
import * as userController from '../../controller/userController'

const adminRouter = express.Router({ mergeParams: true });

adminRouter.post("/admin", (req, resp) => userController.createUser(req, resp))

adminRouter.get("/admin", (req, resp) => userController.getUsers(req, resp))

adminRouter.get("/admin/:id", (req, resp) => userController.getUserById(req, resp))

adminRouter.put("/admin/:id/changePassword", (req, resp) => userController.changePassword(req, resp))

adminRouter.get("/admin/search", (req, resp) => userController.searchUser(req, resp))

export default adminRouter;
