import { usersDB } from "../data/users";
import { User } from "../models/user.model";



export class UserRepository{

    public create(user: User){
        return usersDB.push(user)
    }

    public getAllUsers(){
        return usersDB;
    }

    public listUserId(id: string){
        return usersDB.find((user) => user.id === id);
    }

    public login(email: string){
        return usersDB.find((user) => user.email === email);
    }

}