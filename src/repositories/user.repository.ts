import { usersDB } from "../data/users";
import { Database } from "../database/config/database.connection";
import { User } from "../models/user.model";
import { UserEntity } from "./../database/entities/user.entity";

export class UserRepository {
  public connection = Database.connection.getRepository(UserEntity);

  public async create(user: User) {
    const userEntity = this.connection.create({
      id: user.id,
      email: user.email,
      password: user.password,
    });
    const results = await this.connection.save(userEntity);
    return UserRepository.mapRowToModel(results);
    // return usersDB.push(user)
  }

  public async getAllUsers() {
    const results = await this.connection.find();

    return results.map((entity) => UserRepository.mapRowToModel(entity));
    // return usersDB;
  }

  public async listUserId(id: string) {
    const result = await this.connection.findOne({
      where: {
        id,
      },
    });

    if (!result) {
      return result;
    }

    return UserRepository.mapRowToModel(result);
    //return usersDB.find((user) => user.id === id);
  }

  public async login(email: string) {
    const checkExistUser = await this.connection.findOne({
      where: { email },
    });

    if (!checkExistUser) {
      return null;
    }

    return checkExistUser;
    //return usersDB.find((user) => user.email === email);
  }

  public static mapRowToModel(entity: UserEntity): User {
    return User.create(entity);
  }
}
