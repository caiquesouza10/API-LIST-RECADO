import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../../../shared/util/http-response.adapter";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../../../models/user.model";
import { ListUserUsecase } from "../usecases/list-users.usecase";
import { LoginUsecase } from "../usecases/login.usecase";
import { CreateUserUsecase } from "../usecases/create-user.usecase";
import { ListByIdUserUsecase } from "../usecases/listById-user.usecase";

export class UserController {
  public async create(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const usecase = new CreateUserUsecase();
      const result = await usecase.execute(req.body);

      return res.status(result.code).send(result)

    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const usecase = new ListUserUsecase();
      const result = await usecase.execute();

      return res.status(result.code).send(result)

    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async listUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usecase = new ListByIdUserUsecase();
      const result = await usecase.execute({id});

      return res.status(result.code).send(result)

    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      // 1- obter os parametos
      const { email, password } = req.body;
      
      if (!email) {
        return HttpResponse.fieldNotProvided(res, "E-mail");
      }

      if (!password) {
        return HttpResponse.fieldNotProvided(res, "Password");
      }

      //  2 - chamar o usecase
      const result = await new LoginUsecase().execute(req.body)

      // retornar uma resposta
      // return HttpResponse.success(res, "Login successfully done", {
      //   id: login?.id,
      //   name: login?.email,
      // });
      return res.status(result.code).send(result)
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
