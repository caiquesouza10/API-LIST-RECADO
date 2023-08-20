import { Recado } from "../../../models/recado.model";
import { Result } from "../../../shared/contracts/result.contract";
import { Return } from "../../../shared/util/return.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { RecadoRepository } from "../repositories/recado.repository";

interface ListRecadoArquivadoParams {
  idUser: string;
}

export class ListRecadoArquivadoUsecase {
  public async execute(params: ListRecadoArquivadoParams): Promise<Result> {
    const recadoRepository = new RecadoRepository();
    const user = await new UserRepository().listUserId(params.idUser);

    if (!user) {
      return Return.notFound("User was not found");
    }

    const listaRecadosUser = await recadoRepository.ListararRecadosArquivados({
      idUser: params.idUser,
    });

    return {
      ok: true,
      message: `Recados do ${user.email} arquivado com sucesso!`,
      data: listaRecadosUser?.map((recado) => recado.toJsonR()),
      code: 200,
    };
  }
}
