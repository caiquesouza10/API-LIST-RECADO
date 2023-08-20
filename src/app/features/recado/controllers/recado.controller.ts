import { Recado } from "../../../models/recado.model";
import { Request, Response } from "express";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../../../shared/util/http-response.adapter";
import { UserController } from "../../user/controllers/user.controller";
import { UserRepository } from "../../user/repositories/user.repository";
import { RecadoRepository } from "../repositories/recado.repository";
import { UpdteRecadoUsecase } from "../usecases/update-recados.usecase";
import { LisRecadoUsecase } from "../usecases/list-recados.usecase";
import { CreateRecadoUsecase } from "../usecases/create-recado.usecase";
import { DeleteRecadoUsecase } from "../usecases/delete-recado.usecase";
import { ListRecadoArquivadoUsecase } from "../usecases/listArquivado-recado.usecase";

export class RecadoController {
  public async criarRecado(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const { title, description } = req.body;

      const usecase = new CreateRecadoUsecase();
      const result = await usecase.execute({ title, description, idUser });

      return res.status(result.code).send(result)
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: "Bateu Aqui",
      });
    }
  }

  public async listTodosRecados(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const { title, description } = req.query;

      const usecase = new LisRecadoUsecase();
      const result = await usecase.execute({idUser});

      return res.status(result.code).send(result)
      
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: "esta entrando aqui",
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { idUser, idRecados } = req.params;

      const usecase = new DeleteRecadoUsecase();
      const result = await usecase.execute({idUser, idRecados });

      return res.status(result.code).send(result)

    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { idUser, idRecados } = req.params;
      const { title, description, arquivado } = req.body;
 
      const result = await new UpdteRecadoUsecase().execute({
        idUser,
        idRecados,
        title,
        description,
        arquivado,
      });

      return res.status(result.code).send(result)
      
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async ListararRecadosArquivados(req: Request, res: Response) {
    try {
      const { idUser } = req.params;

      const usecase = new ListRecadoArquivadoUsecase();
      const result = await usecase.execute({idUser});

      return res.status(result.code).send(result)
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  // public procurarRecados(req: Request, res: Response) {
  //   try {
  //     const { idRecados } = req.params;
  //     const { texto } = req.query;

  //     const searchedTasks = recadosDB.filter(
  //       (f) =>
  //         (f.title
  //           .toLocaleLowerCase()
  //           .includes(texto!.toString().toLocaleLowerCase()) ||
  //           f.description
  //             .toLocaleLowerCase()
  //             .includes(texto!.toString().toLocaleLowerCase())) &&
  //         f.id === idRecados &&
  //         f.arquivado === false
  //     );

  //     return HttpResponse.success(
  //       res,
  //       "Recado encontrado por pesquisa de texto!",
  //       searchedTasks
  //     );
  //   } catch (error: any) {
  //     return res.status(500).send({
  //       ok: false,
  //       message: error.toString(),
  //     });
  //   }
  // }
}
