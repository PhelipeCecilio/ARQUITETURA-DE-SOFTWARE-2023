import express from "express";
import { UserController } from "../controllers/UserController";
import { AuthController } from "../controllers/AuthController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const routes = express.Router();

routes.post("/signup", UserController.store);
routes.post("/login", AuthController.store);

// All routes below require authentication
routes.use(AuthMiddleware.isAuthenticated);

routes.get("/users/:email", UserController.show);
routes.put("/users/:email", UserController.update);

// All routes bellow require to be admin
routes.use(AuthMiddleware.isAdmin);

routes.get("/users", UserController.index);
routes.delete("/users/:email", AuthMiddleware.isAdmin, UserController.delete);

export default routes;
