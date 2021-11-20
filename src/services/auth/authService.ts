import {IUserRepository} from "@src/data-access/contracts/userInterface";
import InternalException from "@errors/internalError";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import {config} from "@src/config";

export class AuthService {
    userRepoSitory: IUserRepository<any>;

    constructor(bookRepository: IUserRepository<any>) {
        this.userRepoSitory = bookRepository;
    }

    async login(email: string, password: string) {
        let dataUser = await this.userRepoSitory.findOneByEmail(email)
        if (!dataUser) throw new InternalException("User not found")

        let valid = await bcrypt.compare(password, dataUser.password)
        if (!valid) throw new InternalException("Invalid password")

        const token = jwt.sign({jti: dataUser.user_id, email: dataUser.email}, config.JWT_SIGNATURE_KEY!, {
            expiresIn: config.JWT_EXPIRED_MINUTES,
            algorithm: "HS256",
        });


        return {
            full_name: dataUser.fullname,
            email: dataUser.email,
            token: token,
            secret: "",
        };
    }
}