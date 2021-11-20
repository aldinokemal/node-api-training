import {IUserRepository} from "@src/data-access/contracts/userInterface";
import {IUser} from "@src/data-access/entities/user";
import {PrismaClient} from "@prisma/client";

export default class UserRepository implements IUserRepository<any> {
    db: PrismaClient

    constructor(db: PrismaClient) {
        this.db = db;
    }

    async findBy(): Promise<IUser[] | undefined> {
        let output: IUser[] = [];
        let data = await this.db.user.findMany()
        data.map(e => {
            let user: IUser = {
                user_id: Number(e.user_id),
                email: e.email,
                password: e.password,
                picture: e.picture,
                gender: e.gender,
                fullname: e.fullname,
                birthday: e.birthday,
                created_at: e.created_at,
                updated_at: e.updated_at,
            }
            output.push(user)
        })
        return Promise.resolve(output);
        // return Promise.resolve(this.books);
    }

    async findOneBy(): Promise<IUser | undefined> {
        let data = await this.db.user.findFirst()
        if (data) {
            let output: IUser = {
                user_id: Number(data.user_id),
                email: data.email,
                password: data.password,
                picture: data.picture,
                gender: data.gender,
                fullname: data.fullname,
                birthday: data.birthday,
                created_at: data.created_at,
                updated_at: data.updated_at,
            }
            return Promise.resolve(output);
        } else {
            return Promise.resolve(undefined)
        }
    }
}