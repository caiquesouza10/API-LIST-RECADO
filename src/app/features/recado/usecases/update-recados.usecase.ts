import { ok } from "assert";
import { Result } from "../../../shared/contracts/result.contract";
import { UserRepository } from "../../user/repositories/user.repository";
import { RecadoRepository } from "../repositories/recado.repository";
import { Return } from "../../../shared/util/return.adapter";

interface UpdateRecadoParams {
  idUser: string;
  idRecados: string;
  title?: string;
  description?: string;
  arquivado?: boolean;
}

export class UpdteRecadoUsecase {
  public async execute(params: UpdateRecadoParams): Promise<Result> {
    const user = await new UserRepository().listUserId(params.idUser);

    if (!user) {
      return Return.notFound("User");
    }

    const recadoRepository = new RecadoRepository();

    const recadoIndex = await recadoRepository.getByIRecado(params.idRecados);

    if (!recadoIndex) {
      return Return.notFound("Recado");
    }

    if (params.title) {
      recadoIndex.title = params.title;
    }

    if (params.description) {
      recadoIndex.description = params.description;
    }

    if (params.arquivado !== undefined) {
      recadoIndex.arquivado = params.arquivado;
    }

    await recadoRepository.update(recadoIndex);

    const recado = await recadoRepository.listTodosRecados({
      idUser: params.idUser,
    });

    return Return.success(
      "Recado was successfully updated",
      recado?.map((recado) => recado.toJsonR())
    );
  }
}
