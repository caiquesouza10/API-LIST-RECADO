import { usersDB } from "../data/users";
import { Request, Response } from "express";
// Constants enumerating the HTTP status codes.
import { StatusCodes } from "http-status-codes";
import { HttpResponse } from "../util/http-response.adapter";
import { User } from "../models/user.model";
import { UserRepository } from "../repositories/user.repository";

export class UserController {
  public create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      //aqui vai o codigo para validar a senha e no body tenho que colocar o repassword tbm

      const user = new User(name, email, password);
      //usersDB.push(user);
      UserRepository.create(user);

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

  public getAllUsers(req: Request, res: Response) {
    try {
      const { email } = req.query;

      // let result = usersDB;
      let result = UserRepository.getAllUsers();

      // if (name) {
      //   result = usersDB.filter((user) => user.name === name);
      // }
      if (email) {
        result = usersDB.filter((user) => user.email === email);
      }

      return res.status(200).send({
        ok: true,
        message: "Users were sucessfully listed",
        data: result.map((user) => user.toJsonU()),
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: error.toString(),
      });
    }
  }

  public listUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // const result = usersDB.find((user) => user.id === id);
      const result = UserRepository.listUserId(id);

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

  public login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return HttpResponse.fieldNotProvided(res, "E-mail");
      }

      if (!password) {
        return HttpResponse.fieldNotProvided(res, "Password");
      }

      //const user = usersDB.find((user) => user.email === email);
      const user = UserRepository.login(email);

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
