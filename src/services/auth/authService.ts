import {IUserRepository} from "@src/data-access/contracts/userInterface";

export class AuthService {
    userRepoSitory: IUserRepository<any>;

    constructor(bookRepository: IUserRepository<any>) {
        this.userRepoSitory = bookRepository;
    }

    async login(accountID: string, password: string) {
        return await this.userRepoSitory.findOneBy()
    }
}