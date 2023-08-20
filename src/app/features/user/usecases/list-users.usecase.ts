import { Result } from "../../../shared/contracts/result.contract";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { UserRepository } from "../repositories/user.repository";

export class ListUserUsecase {
  public async execute(): Promise<Result> {
    //verificar se existe usersem cache
    const cacheRepository = new CacheRepository();
    const cachedUsers = await cacheRepository.get("users");

    //se tem cache, retorna o que estiver em cache
    if (cachedUsers) {
      return {
        ok: true,
        message: "Users successuly listed (cache)",
        data: cachedUsers,
        code: 200,
      };
    }

    const repository = new UserRepository();
    const result = await repository.getAllUsers();

    //se não estiver em cache, sera o cache
    await cacheRepository.set("users", result);

    return {
      ok: true,
      message: "Users successuly listed",
      data: result,
      code: 200,
    };
  }
}
