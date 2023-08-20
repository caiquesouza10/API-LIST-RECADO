import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../../../shared/util/http-response.adapter";

export class UserMiddleware {
  // public static validateUserExists(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const { idUser } = req.params;

  //     const user = usersDB.find((user) => user.id === idUser);

  //     if (!user) {
  //       return HttpResponse.notFound(res, "User");
  //     }
  //     next();
  //   } catch (error: any) {
  //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
  //       ok: false,
  //       message: error.toString(),
  //     });
  //   }
  // }

  // public static checkEmailExistence(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ) {
  //   try {
  //     const { email } = req.body;

  //     // const checkEmail = usersDB.find((e) => e.email === email);

  //     if (email) {
  //       return HttpResponse.existe(res, "Email");
  //     }
  //     next();
  //   } catch (error: any) {
  //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
  //       ok: false,
  //       message: error.toString(),
  //     });
  //   }
  // }

  public static verificaCamposVazios(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password, repassword } = req.body;

      if (!email || !password || !repassword) {
        return res.status(404).send({
          ok: false,
          message: "Existe campos vazios, favor preencher",
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

  public static verificaEmailCorreto(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.body;
      const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

      if (!email || !email.match(regexEmail)) {
        return res.status(404).send({
          ok: false,
          message: "E-mail preenchido incorretamente Back-end!!",
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

  public static verificaSenhas(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { password, repassword } = req.body;

      if (password !== repassword) {
        return res.status(400).send({
          ok: false,
          message: "Senhas Invalidas",
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

  public static verificaUserExiste(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(404).send({
          ok: false,
          message: "Existem campos vazios, favor preencher",
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
