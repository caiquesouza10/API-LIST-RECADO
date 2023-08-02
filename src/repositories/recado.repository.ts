import { Not } from "typeorm";
import { recadosDB } from "../data/recados";
import { Database } from "../database/config/database.connection";
import { RecadoEntity } from "../database/entities/recado.entity";
import { Recado } from "../models/recado.model";
import { UserRepository } from "./user.repository";

interface ListRecadosParams {
  idUser: string;
  arquivado?:boolean;
}

export class RecadoRepository {
  private connection = Database.connection.getRepository(RecadoEntity);

  public async criarRecado(recado: Recado) {
    const recadoEntity = this.connection.create({
      id: recado.id,
      title: recado.title,
      description: recado.description,
      arquivado: recado.arquivado,
      idUser: recado.user.id,
    });

    await this.connection.save(recadoEntity);
    //return recadosDB.push(recado)
    const result = await this.connection.findOne({
      where: { id: recado.id },
      relations: { user: true },
    });
    return this.mapRowToModel(result!);
  }

  public async listTodosRecados(params: ListRecadosParams) {
    const checkExistUser = await this.connection.findOne({ where: { idUser: params.idUser } });

    if (!checkExistUser) {
      return null;
    }

    const recados = await this.connection.find({
      where: {idUser: params.idUser, arquivado: Not(true)},
      relations: { user: true },
    });

    if (!recados) {
      return null;
    }

    return recados.map((row) => this.mapRowToModel(row));

    //return recadosDB.filter((recado) => recado.user.id === idUser && recado.arquivado === false );
  }

  public async delete(idRecado: string) {
    const result = await this.connection.delete({
      id: idRecado,
    });

    return result.affected ?? 0;
    //return recadosDB.splice(recadoIndex, number);
  }

  public async buscaRecado(id: string) {
    const result = await this.connection.findOneBy({
        id,
    });

    if (!result) {
        return undefined;
    }

    return this.mapRowToModel(result);
    //return recadosDB.findIndex((recado) => recado.id === idRecados);
  }

  public async update(idRecados: Recado) {
    await this.connection.update(
      {
        id: idRecados.id,
      },
      {
        title: idRecados.title,
        description: idRecados.description,
        arquivado: idRecados.arquivado,
      }
    );
    //return recadosDB.find((recado) => recado.id === idRecados);
  }

  public async getByIRecado(id: string) {
    const result = await this.connection.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
      },
    });

    if (!result) {
      return undefined;
    }

    return this.mapRowToModel(result);
  }

  public async ListararRecadosArquivados(params: ListRecadosParams) {
    const recados = await this.connection.find({
      where: {idUser: params.idUser, arquivado: Not(false)},
      relations: { user: true },
    });

    if (!recados) {
      return null;
    }

    return recados;

    //return recadosDB.filter((f) => f.arquivado === true);
  }

  private mapRowToModel(entity: RecadoEntity): Recado {
    const user = UserRepository.mapRowToModel(entity.user);
    return Recado.create(entity, user);
  }
}
