import { recadosDB } from "../../data/recados";
import { usersDB } from "../../data/users";
import { Recado } from "../../models/recado.model";
import { Request, Response } from "express";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../../util/http-response.adapter";
import { UserController } from "../users/user.controller";
import { UserRepository } from "../../repositories/user.repository";
import { RecadoRepository } from "../../repositories/recado.repository";

export class RecadoController {
  public criarRecado(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const { title, description } = req.body;

      // const user = usersDB.find((user) => user.id === idUser);
      const user = UserRepository.listUserId(idUser);

      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "User was not found" });
      }

      const newErrand = new Recado(title, description, user);
      // recadosDB.push(newErrand);
      RecadoRepository.criarRecado(newErrand);

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

  public listTodosRecados(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const { title, description } = req.query;

      //const user = usersDB.find((user) => user.id === idUser);
      const user = UserRepository.listUserId(idUser);

      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ ok: false, message: "User was not found" });
      }

      // const result = recadosDB.filter(
      //   (recado) => recado.user.id === idUser && recado.arquivado === false
      // );

      const result = RecadoRepository.listTodosRecados(idUser);

      const recados = result;

      const recadoTitle = recados.filter((recado) => recado.title === title);
      
      const recadoDescription = recados.filter(
        (recado) => recado.description === description
      );

      if (title) {
        return res.json({
          message: "Recado filtrada por titulo",
          recado: recadoTitle.map((recado) => recado.toJsonR()),
        });
      }

      if (description) {
        return res.json({
          message: "recado filtrada por descrição",
          recado: recadoDescription.map((recado) => recado.toJsonR()),
        });
      }

      return res.status(StatusCodes.OK).send({
        ok: true,
        message: `Recados successfully listed of user ${user.email}`,
        data: result.map((recado) => recado.toJsonR()),
      });
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: "esta entrando aqui",
      });
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { idUser, idRecados } = req.params;

      // const existeUser = usersDB.find((user) => user.id === idUser);
      // if (!existeUser) {
      //   return HttpResponse.notFound(res, "User");
      // }

      // const recadoIndex = recadosDB.findIndex(
      //   (recado) => recado.id === idRecados
      // );
      const recadoIndex = RecadoRepository.buscaRecado(idRecados);

      if (recadoIndex < 0) {
        return HttpResponse.notFound(res, "Recado");
      }

      //const deleteRecado = recadosDB.splice(recadoIndex, 1);
      const deleteRecado = RecadoRepository.delete(recadoIndex, 1);

      return res.status(201).send({
        ok: true,
        message: "Recado was successfully deleted",
        data: deleteRecado[0].toJsonR(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public update(req: Request, res: Response) {
    try {
      const { idUser, idRecados } = req.params;

      const { title, description, arquivado } = req.body;

      // const existeUser = usersDB.find((user) => user.id === idUser);
      // if (!existeUser) {
      //   return HttpResponse.notFound(res, "User");
      // }

      //const recadoIndex = recadosDB.find((recado) => recado.id === idRecados);
      const recadoIndex = RecadoRepository.update(idRecados);

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

      return HttpResponse.success(
        res,
        "Recado was successfully updated",
        recadoIndex.toJsonR()
      );
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public ListararRecadosArquivados(req: Request, res: Response) {
    try {
      const { idUser } = req.params;

      //const existeUser = usersDB.find((user) => user.id === idUser);
      const existeUser = UserRepository.listUserId(idUser);

      if (!existeUser) {
        return HttpResponse.notFound(res, "User");
      }

      // const targetTask = recadosDB.find((f) => f.arquivado === true);
      // targetTask!.arquivado = true;

      //const listaRecadosUser = recadosDB.filter((f) => f.arquivado === true);
      const listaRecadosUser = RecadoRepository.ListararRecadosArquivados();

      return HttpResponse.success(
        res,
        `Recados do ${existeUser.email} arquivado com sucesso!`,
        listaRecadosUser.map((recado) => recado.toJsonR())
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
