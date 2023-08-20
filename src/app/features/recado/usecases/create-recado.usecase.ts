import { Recado } from "../../../models/recado.model";
import { Result } from "../../../shared/contracts/result.contract";
import { Return } from "../../../shared/util/return.adapter";
import { UserRepository } from "../../user/repositories/user.repository";
import { RecadoRepository } from "../repositories/recado.repository";

interface ListRecadoArquivadoParams {
    idUser: string,
    title: string,
    description: string
}

export class CreateRecadoUsecase {
  public async execute(params: ListRecadoArquivadoParams): Promise<Result> {

    const user = await new UserRepository().listUserId(params.idUser);

      if (!user) {
        return Return.notFound("User was not found");
        // return res
        //   .status(StatusCodes.NOT_FOUND)
        //   .send({ ok: false, message: "User was not found" });
      }

      const newErrand = new Recado(params.title, params.description, user);

      await new RecadoRepository().criarRecado(newErrand);
  
    return {
        ok: true,
        message: `Recado for ${user.email}, was sucessfully created`,
        data: newErrand.toJsonR(),
        code: 200,
    }
  }
}