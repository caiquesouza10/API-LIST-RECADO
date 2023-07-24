import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const config = new DataSource({
    type: "postgres",
    // port: 5432,
    // host: process.env.DB_HOST,
    // username: process.env.DB_USER,
    // database: process.env.DB_NAME,
    // password: process.env.DB_PASS,
    url: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    }, 
    synchronize: false,       //automaticamente mapea tudo que tem no banco de dados 
    schema: "recado",         // vou colocar o schema que estou usando no banco de dados Postegree
    entities: ["src/database/entities/**/*.ts"],   // mostra toda as entidades que temos na pasta entities

});

export default config;
