import { recadosDB } from "../data/recados";
import { usersDB } from "../data/users";
import { Recado } from "../models/recado.model";
import { Request, Response } from "express";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../util/http-response.adapter";
import { UserController } from "./user.controller";
import { UserRepository } from "../repositories/user.repository";
import { RecadoRepository } from "../repositories/recado.repository";



export class RecadoController {
  public async criarRecado(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const { title, description } = req.body;

      // const user = usersDB.find((user) => user.id === idUser);
      const user = await new UserRepository().listUserId(idUser);

      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "User was not found" });
      }

      const newErrand = new Recado(title, description, user);
      // recadosDB.push(newErrand);
      await new RecadoRepository().criarRecado(newErrand);

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: "Recado was sucessfully created",
        data: newErrand.toJsonR(),
      });
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

      //const user = usersDB.find((user) => user.id === idUser);
      const user = await new UserRepository().listUserId(idUser);

      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "User was not found" });
      }

      const result = await new RecadoRepository().listTodosRecados({idUser: idUser, title: title, description: description});

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: `Recados successfully listed of user ${user.email}`,
        data: result?.map((recado) => recado.toJsonR()),
      });
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

      const result = await new UserRepository().listUserId(idUser);

      if (!result) {
        return res.status(404).send({
          ok: false,
          message: "User was not found",
        });
      }

      const recadoRepository = new RecadoRepository();

      const delitedRecados = await recadoRepository.delete(idRecados);
      //const recadoIndex = RecadoRepository.buscaRecado(idRecados);

      // if (recadoIndex < 0) {
      //   return HttpResponse.notFound(res, "Recado");
      // }
      if (delitedRecados < 0) {
        return HttpResponse.notFound(res, "Recado");
      }

      const recados = await recadoRepository.listTodosRecados({
        idUser: idUser,
      });

      //const deleteRecado = recadosDB.splice(recadoIndex, 1);
      //const deleteRecado = RecadoRepository.delete(recadoIndex, 1);

      return res.status(201).send({
        ok: true,
        message: "Recado was successfully deleted",
        data: recados?.map((recado) => recado.toJsonR())
      });
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
      const recadoRepository = new RecadoRepository();

      //const recadoIndex = recadosDB.find((recado) => recado.id === idRecados);
      const recadoIndex = await recadoRepository.getByIRecado(idRecados);

      if (!recadoIndex) {
        return HttpResponse.notFound(res, "Recado");
      }

      if (title) {
        recadoIndex.title = title;
      }

      if (description) {
        recadoIndex.description = description;
      }

      if (arquivado !== undefined) {
        recadoIndex.arquivado = arquivado;
      }

      const recados = await recadoRepository.update(recadoIndex);

      return HttpResponse.success(
        res,
        "Recado was successfully updated",
        recados
      );
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
      const recadoRepository = new RecadoRepository();

      //const existeUser = usersDB.find((user) => user.id === idUser);
      const user = await new UserRepository().listUserId(idUser);

      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "User was not found" });
      }

      //const listaRecadosUser = recadosDB.filter((f) => f.arquivado === true);
      const listaRecadosUser = await recadoRepository.ListararRecadosArquivados({
        idUser
      });

      //const result = await new RecadoRepository().ListararRecadosArquivados({idUser: idUser});


      return HttpResponse.success(
        res,
        `Recados do ${user.email} arquivado com sucesso!`,
        listaRecadosUser?.map((recado) => recado.toJsonR()),
      );
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public procurarRecados(req: Request, res: Response) {
    try {
      const { idRecados } = req.params;
      const { texto } = req.query;

      const searchedTasks = recadosDB.filter(
        (f) =>
          (f.title
            .toLocaleLowerCase()
            .includes(texto!.toString().toLocaleLowerCase()) ||
            f.description
              .toLocaleLowerCase()
              .includes(texto!.toString().toLocaleLowerCase())) &&
          f.id === idRecados &&
          f.arquivado === false
      );

      return HttpResponse.success(
        res,
        "Recado encontrado por pesquisa de texto!",
        searchedTasks
      );
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }
}
