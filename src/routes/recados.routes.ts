import { Router } from "express";
import { RecadoController } from "../controllers/recado.controller";
import { UserMiddleware } from "../middlewares/user.middleware";
import { RecadoMiddleware } from "../middlewares/transactions.middleware";

export const RecadosRouter = () => {
  const app = Router({
    mergeParams: true,
  });

  const controller = new RecadoController();

  app.post("/", [RecadoMiddleware.RecadoCheck], controller.criarRecado);

  app.get("/", controller.listTodosRecados);

  app.delete(
    "/:idRecados",
    [UserMiddleware.validateUserExists, RecadoMiddleware.RecadoNaoEncontrado],
    controller.delete
  );

  app.put(
    "/:idRecados",
    [
      UserMiddleware.validateUserExists,
      RecadoMiddleware.RecadoCheck,
      RecadoMiddleware.RecadoNaoEncontrado,
    ],
    controller.update
  );

  app.get("/arquivados", controller.ListararRecadosArquivados);

  return app;
};
