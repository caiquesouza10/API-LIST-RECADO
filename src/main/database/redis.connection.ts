import Redis from "ioredis";
import config from "../config/redis.config";

export class CacheDatabase {
  // PROPRIEDADE
  private static _connection: Redis;

  // GETTERS - esse tu chama no repositories
  public static get connection() {
    return this._connection;
  }

  // METODO - so no index || server
  public static async connect() {
    this._connection = new Redis(config);
    console.log("CacheDatabase is connected...");
  }
}
