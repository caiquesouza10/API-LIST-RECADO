import { v4 as createUuid } from "uuid";
import { Recado } from "./recado.model";
import { Entity } from 'typeorm';
import { UserEntity } from "../database/entities/user.entity";

export class User {
  public id: string;

  constructor(
    // private _name: string,
    private _email: string,
    private _password: string
  ) {
    this.id = createUuid();
  }

  public get email() {
    return this._email;
  }

  public get password() {
    return this._password;
  }

  // public get name() {
  //   return this._name;
  // }

  public set email(email: string) {
    this._email = email;
  }

  public toJsonU() {
    return {
      id: this.id,
      // name: this._name,
      email: this._email,
    };
  }

  public static create(row: UserEntity){
    const user = new User(row.email, row.password);
    user.id = row.id
    
    return user;
  }
}


