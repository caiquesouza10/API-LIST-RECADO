import { Recado } from "../models/recado.model";
import { usersDB } from "./users";

export const recadosDB = [
  new Recado("compras", "mercado",usersDB[0]),
  new Recado("lazer", "jogar bola", usersDB[0]),
  new Recado("filhos", "cuida dos filhos", usersDB[1]),
  new Recado("trabalho", "procurar vagas", usersDB[2]),
];
