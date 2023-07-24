import { Router } from "express";
import { UserController } from "../controllers/users/user.controller";
import { RecadosRouter } from "./recados.routes";
import { UserMiddleware } from './../controllers/users/middlewares/user.middleware';

export const usersRoutes = () => {
  const app = Router();

  app.post("/", [UserMiddleware.verificaCamposVazios, UserMiddleware.checkEmailExistence, UserMiddleware.verificaEmailCorreto ,UserMiddleware.verificaSenhas ],  new UserController().create)

  app.get("/", new UserController().getAllUsers);

  app.get("/:id", new UserController().listUserId);

  app.post("/login",[ UserMiddleware.verificaUserExiste, ] ,new UserController().login);

  app.use("/:idUser/recados", RecadosRouter()); //

  return app;
};
