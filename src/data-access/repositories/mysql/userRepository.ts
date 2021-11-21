import {IUserRepository} from "@src/data-access/contracts/userInterface";
import {IUser} from "@src/data-access/entities/user";
import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

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

    async findOneByEmail(email: string): Promise<IUser | undefined> {
        let data = await this.db.user.findUnique({
            where: {email: email}
        })
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

    async createUser(email: string, password: string): Promise<IUser | undefined> {
        try {
            let dataUser: IUser = {
                user_id: 0,
                email: '',
                password: '',
                picture: '',
                gender: '',
                fullname: null,
                birthday: null,
                created_at: null,
                updated_at: null,
            }
            await this.db.$transaction(async (prisma) => {
                password = await bcrypt.hash(password, 10)
                const newUser = await prisma.user.create({
                    data: {email, password, created_at: new Date(), updated_at: new Date()}
                })
                dataUser.user_id = Number(newUser.user_id)
                dataUser.email = newUser.email
                dataUser.password = newUser.password
                dataUser.picture = newUser.picture
                dataUser.created_at = newUser.created_at
                dataUser.updated_at = newUser.updated_at
            })

            return Promise.resolve(dataUser);
        } catch (err) {
            console.log(err)
            return Promise.resolve(undefined);
        }
    }
}