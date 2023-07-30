import { recadosDB } from "../data/recados";
import { Database } from "../database/config/database.connection";
import { RecadoEntity } from "../database/entities/recado.entity";
import { Recado } from "../models/recado.model";
import { UserRepository } from "./user.repository";

export class RecadoRepository {
  private repository = Database.connection.getRepository(RecadoEntity);
  public async criarRecado(recado: Recado) {
    const recadoEntity = this.repository.create({
      id: recado.id,
      title: recado.title,
      description: recado.description,
      arquivado: recado.arquivado,
      idUser: recado.user.id,
    });

    await this.repository.save(recadoEntity);
    //return recadosDB.push(recado)
  }

  public async listTodosRecados(idUser: string) {
    return recadosDB.filter(
      (recado) => recado.user.id === idUser && recado.arquivado === false
    );
  }

  public async delete(recadoIndex: number, number: number) {
    return recadosDB.splice(recadoIndex, number);
  }

  public async buscaRecado(idRecados: string) {
    return recadosDB.findIndex((recado) => recado.id === idRecados);
  }

  public async update(idRecados: string) {
    return recadosDB.find((recado) => recado.id === idRecados);
  }

  public async ListararRecadosArquivados() {
    return recadosDB.filter((f) => f.arquivado === true);
  }

  private mapRowToModel(entity: RecadoEntity): Recado {
    const user = UserRepository.mapRowToModel(entity.user);
    return Recado.create(entity, user);
  }
}
