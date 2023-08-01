import { usersDB } from "../data/users";
import { Database } from "../database/config/database.connection";
import { User } from "../models/user.model";
import { UserEntity } from "./../database/entities/user.entity";

export class UserRepository {
  private connection = Database.connection.getRepository(UserEntity);

  public async create(user: User) {
    const userEntity = this.connection.create({
      id: user.id,
      name: user.name,
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
      return undefined;
    }

    return UserRepository.mapRowToModel(result);
    //return usersDB.find((user) => user.id === id);
  }

  // public async getByPassword(password: string) {
  //   const result = await this.connection.findOne({ where: { password } });

  //   if (!result) {
  //     return undefined;
  //   }

  //   return UserRepository.mapRowToModel(result);
  // }

  // public async getById(id: string) {
  //   const result = await this.connection.findOneBy({ id });

  //   if (!result) {
  //     return undefined;
  //   }
  //   return UserRepository.mapRowToModel(result);
  // }

  // public async getByEmail(email: string) {
  //   const result = await this.connection.findOne({ where: { email } });

  //   if (!result) {
  //     return undefined;
  //   }

  //   return UserRepository.mapRowToModel(result);
  // }

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
