import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { RecadosRouter } from "../../recado/routers/recados.routes";
import { UserMiddleware } from "../validations/user.middleware";

export const usersRoutes = () => {
  const app = Router();

  app.post(
    "/",
    [
      UserMiddleware.verificaCamposVazios,
      UserMiddleware.verificaEmailCorreto,
      UserMiddleware.verificaSenhas,
    ],
    new UserController().create
  );

  app.get("/", new UserController().getAllUsers);

  app.get("/:id", new UserController().listUserId);

  app.post(
    "/login",
    [UserMiddleware.verificaUserExiste],
    new UserController().login
  );

  app.use("/:idUser/recados", RecadosRouter()); //

  return app;
};
