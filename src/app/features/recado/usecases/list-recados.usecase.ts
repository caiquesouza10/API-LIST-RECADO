import { Result } from "../../../shared/contracts/result.contract";
import { Return } from "../../../shared/util/return.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { RecadoRepository } from "../repositories/recado.repository";

interface ListRecadoParams {
    idUser: string,
    title?: string
    description?: string
}

export class LisRecadoUsecase {
  public async execute(params: ListRecadoParams): Promise<Result> {

    const user = await new UserRepository().listUserId(params.idUser);

      if (!user) {
        return Return.notFound("User was not found");
      }

      const result = await new RecadoRepository().listTodosRecados({
        idUser: params.idUser,
        title: params.title,
        description: params.description,
      });
  
    return {
        ok: true,
        message: `Recados successfully listed of user ${user.email}`,
        data: result?.map((recado) => recado.toJsonR()),
        code: 200,
    }
  }
}