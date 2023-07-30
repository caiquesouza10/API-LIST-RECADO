import { DataSource } from "typeorm";
import dataSource from "./database.config";

export class Database {
  // PROPRIEDADE
  private static _connection: DataSource;

  // GETTERS - esse tu chama no repositories
  public static get connection() {
    return this._connection;
  }

  // METODO - so no index || server
  public static async connect() {
    this._connection = await dataSource.initialize();
  }
}
