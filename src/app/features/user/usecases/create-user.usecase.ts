import { User } from "../../../models/user.model";
import { Result } from "../../../shared/contracts/result.contract";
import { Return } from "../../../shared/util/return.adapter";
import { UserRepository } from "../repositories/user.repository";

interface CreateUserParams {
    email: string
    password: string
}


export class CreateUserUsecase {
    public async execute(params: CreateUserParams): Promise<Result> {
        const repository = new UserRepository();

        const existeByEmail = await repository.getByEmail(params.email);
  
        if (existeByEmail) {
          return Return.existe("Email já existe no banco!!!");
        }
  
        const user = new User(params.email, params.password);
  
        await repository.create(user);
  
      return {
          ok: true,
          message: "Users successuly listed",
          data: user.toJsonU(),
          code: 200,
      }
    }
  }