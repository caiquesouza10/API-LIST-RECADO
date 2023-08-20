import { Result } from "../../../shared/contracts/result.contract";
import { Return } from "../../../shared/util/return.adapter";
import { UserRepository } from "../repositories/user.repository";

interface ListByIdParams {
    id: string
}


export class ListByIdUserUsecase {
  public async execute(params: ListByIdParams): Promise<Result> {

    const repository = new UserRepository();
    const result = await repository.listUserId(params.id);

    if (!result) {
      return Return.notFound("User was not found");
    }

    return Return.success("Users successuly listed by ID", result)
  }
}