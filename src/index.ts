import { Database } from "./main/database/database.connection";
import { Server } from "./main/config/express.config";
import "reflect-metadata";

Database.connect().then(() => {
  console.log("DB is connected...");

  const app = Server.create();
  Server.listen(app);
});
