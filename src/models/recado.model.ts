import { v4 as createUuid } from "uuid";
import { User } from "./user.model";

export class Recado {
  private _id: string;
  private _arquivado: boolean;
 

  constructor(
    private _title: string,
    private _description: string,
    private _user: User
  ) {
    this._id = createUuid();
    this._arquivado = false;
  }

  public get id() {
    return this._id;
  }
  public get title() {
    return this._title;
  }
  public get description() {
    return this._description;
  }

  public get arquivado() {
    return this._arquivado;
  }

  public get user(): User {
    return this._user;
  }

  public set title(title: string) {
    this._title = title;
  }

  public set description(description: string) {
    this._description = description;
  }

  public set arquivado(arquivado: boolean) {
    this._arquivado = arquivado;
  }

  public toJsonR() {
    return {
      id: this.id,
      title: this._title,
      description: this._description,
      arquivado: this._arquivado
    };
  }
}
