import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

let entities = ["src/database/entities/**/*.ts"];
let migrations = ["src/database/migrations/**/*.ts"];

if (process.env.DB_ENV === "prod") {
  entities = ["src/database/entities/**/*.js"];
  migrations = ["src/database/migrations/**/*.js"];
}

const config = new DataSource({
  type: "postgres",
  port: 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false, //automaticamente mapea tudo que tem no banco de dados
  schema: "recados", // vou colocar o schema que estou usando no banco de dados Postegree
  logging: true,
  entities,
  migrations,
});

export default config;
