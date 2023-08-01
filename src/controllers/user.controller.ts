import { usersDB } from "../data/users";
import { Request, Response } from "express";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../util/http-response.adapter";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class UserController {
  public async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const repository = new UserRepository();

      const user = new User(name, email, password);
      //usersDB.push(user);

      const result = await repository.create(user);

      return res.status(201).send({
        ok: true,
        message: "User was successfully created",
        data: user.toJsonU(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async getAllUsers(req: Request, res: Response) {
    try {
      const repository = new UserRepository();
      const result = await repository.getAllUsers();

      return HttpResponse.success(res, "User successfuly llisted", result);

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

      // const result = usersDB.find((user) => user.id === id);
      const repository = new UserRepository();
      const result = await repository.listUserId(id);

      if (!result) {
        return res.status(404).send({
          ok: false,
          message: "User was not found",
        });
      }

      return res.status(200).send({
        ok: true,
        message: "Users was sucessfully obtained",
        data: result.toJsonU(),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const repository = new UserRepository();

      if (!email) {
        return HttpResponse.fieldNotProvided(res, "E-mail");
      }

      if (!password) {
        return HttpResponse.fieldNotProvided(res, "Password");
      }

      //const user = usersDB.find((user) => user.email === email);
      const user = await repository.login(email);

      if (!user) {
        // return HttpResponse.notFound(res, "User");
        return HttpResponse.invalidCredentials(res);
      }

      if (user.password !== password) {
        return HttpResponse.invalidCredentials(res);
      }

      return HttpResponse.success(res, "Login successfully done", {
        id: user.id,
        name: user.email,
      });
    } catch (error: any) {
      return HttpResponse.genericError(res, error);
    }
  }
}
