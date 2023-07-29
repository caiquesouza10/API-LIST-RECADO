import { usersDB } from "../data/users";
import { User } from "../models/user.model";

export class UserRepository{

    public static create(user: User){
        return usersDB.push(user)
    }

    public static getAllUsers(){
        return usersDB;
    }

    public static listUserId(id: string){
        return usersDB.find((user) => user.id === id);
    }

    public static login(email: string){
        return usersDB.find((user) => user.email === email);
    }

}