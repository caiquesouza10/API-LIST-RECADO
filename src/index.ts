import express from "express";
import { usersRoutes } from "./routes/users.routes";
import cors from "cors";
import "reflect-metadata"
import { Database } from "./database/config/database.connection";


const app = express();
app.use(cors({origin:'*'}))
app.use(express.json());

app.use("/user", usersRoutes());

Database.connect().then(() => {
  console.log("Database is connected !!!");
  
  app.listen(3333, () => {
    console.log("API is running Recados");
  });
  
});

