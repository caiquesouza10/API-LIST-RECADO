import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { recadosDB } from "../../../data/recados";

export class RecadoMiddleware {
  public static RecadoCheck(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;

      if (!title) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          ok: false,
          message: "Title was not provided",
        });
      }

      if (!description) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          ok: false,
          message: "Description was not provided",
        });
      }

      next();
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public static RecadoNaoEncontrado(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { idRecados } = req.params;

      const recado = recadosDB.find((e) => e.id === idRecados);

      if (!recado) {
        return res.status(400).json({
          success: false,
          message: "Recado não encontrado!",
        });
      }

      next();
    } catch (error: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

}
