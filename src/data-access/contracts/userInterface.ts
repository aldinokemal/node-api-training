import {IUser} from "@src/data-access/entities/user";

export interface IUserRepository<T> {
    findBy: () => Promise<IUser[] | undefined>;
    findOneByEmail: (email: string) => Promise<IUser | undefined>;
    createUser: (email: string, password: string) => Promise<IUser | undefined>;
}