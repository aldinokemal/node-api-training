import {IUserRepository} from "@src/data-access/contracts/userInterface";
import InternalException from "@errors/internalError";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import {config} from "@src/config";
import {ILoginRequest, ILoginResponse} from "@modules/auth/interfaces/login.interface";
import {IRegisterResponse} from "@modules/auth/interfaces/register.interface";

export class AuthService {
    userRepoSitory: IUserRepository<any>;

    constructor(userRepository: IUserRepository<any>) {
        this.userRepoSitory = userRepository;
    }

    async login(data: ILoginRequest): Promise<ILoginResponse> {
        let dataUser = await this.userRepoSitory.findOneByEmail(data.email)
        if (!dataUser) throw new InternalException("User not found")

        let valid = await bcrypt.compare(data.password, dataUser.password)
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

    async register(data: ILoginRequest): Promise<IRegisterResponse> {
        // checking is exist email ?
        let dataUser = await this.userRepoSitory.findOneByEmail(data.email)
        if (dataUser != undefined) throw new InternalException(`Email ${data.email} already used`)

        let inserting = await this.userRepoSitory.createUser(data.email, data.password)
        if (inserting == undefined) throw new InternalException('Cannot create user in database')
        return {
            message: "Register success"
        }
    }
}