import { Result } from "../../../shared/contracts/result.contract";
import { UserRepository } from "../repositories/user.repository";

export class ListUserUsecase {
  public async execute(): Promise<Result> {
    const repository = new UserRepository();
    const result = await repository.getAllUsers();

    return {
        ok: true,
        message: "Users successuly listed",
        data: result,
        code: 200,
    }
  }
}
