import { Router } from "express";
import { RecadoController } from "../controllers/recado.controller";
import { UserMiddleware } from "../../user/validations/user.middleware";
import { RecadoMiddleware } from "../validations/transactions.middleware";

export const RecadosRouter = () => {
  const app = Router({
    mergeParams: true,
  });

  const controller = new RecadoController();

  app.post("/", [RecadoMiddleware.RecadoCheck], controller.criarRecado);

  app.get("/", controller.listTodosRecados);

  app.delete("/:idRecados", controller.delete);

  app.put("/:idRecados", [RecadoMiddleware.RecadoCheck], controller.update);

  app.get("/arquivados", controller.ListararRecadosArquivados);

  return app;
};
