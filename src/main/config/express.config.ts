import express, { Express } from "express";
import cors from "cors";
import { usersRoutes } from "../../app/features/user/routes/users.routes";
import * as dotenv from "dotenv";
dotenv.config();

export class Server {
  public static create() {
    const app = express();
    app.use(express.json());
    app.use(cors({ origin: "*" }));

    app.use("/user", usersRoutes());

    return app;
  }

  public static listen(app: Express) {
    app.listen(3333, () => {
      console.log(`API is running Recados ${process.env.PORT}`);
    });
  }
}
