import { Result } from "../../../shared/contracts/result.contract";
import { Return } from "../../../shared/util/return.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { RecadoRepository } from "../repositories/recado.repository";

interface DeleteRecadoParams {
  idUser: string;
  idRecados: string;
}

export class DeleteRecadoUsecase {
  public async execute(params: DeleteRecadoParams): Promise<Result> {
    const user = await new UserRepository().listUserId(params.idUser);

    if (!user) {
      return Return.notFound("User was not found");
    }

    const recadoRepository = new RecadoRepository();

    const delitedRecados = await recadoRepository.delete(params.idRecados);

    if (delitedRecados < 0) {
      return Return.notFound("Recado");
    }

    const recados = await recadoRepository.listTodosRecados({
      idUser: params.idUser,
    });

    return {
      ok: true,
      message: `Recado for ${user.email}, was successfully deleted`,
      data: recados?.map((recado) => recado.toJsonR()),
      code: 200,
    };
  }
}
