import {IUser} from "@src/data-access/entities/user";

export interface IUserRepository<T> {
    findBy: () => Promise<IUser[] | undefined>;
    findOneBy: () => Promise<IUser | undefined>;
}