import { Result } from "../../../shared/contracts/result.contract";
import { Return } from "../../../shared/util/return.adapter";
import { UserRepository } from "../repositories/user.repository";

interface loginUserParams {
  email: string;
  password: string;
}

export class LoginUsecase {
  public async execute(params: loginUserParams): Promise<Result> {
    const repository = new UserRepository();
    const login = await new UserRepository().getByEmail(params.email);

    const existeByEmail = await repository.getByEmail(params.email);
    const existeByPassword = await repository.getByPassword(params.password);

    if (!existeByEmail || !existeByPassword) {
      return Return.invalidCredentials();
      //   return {
      //     ok: false,
      //     message: "Existe Campos vazios. Acesso não autorizado!",
      //     code: 401,
      //   };
    }

    if (existeByEmail.password != params.password) {
      return Return.invalidCredentials();
    }
    
    return Return.successLogin("Login feito com suceso", { idUser: login?.id, email: login?.email });
  }
}
