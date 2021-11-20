import {IUserRepository} from "@src/data-access/contracts/userInterface";
import {Connection} from "mysql2";
import {IUser} from "@src/data-access/entities/user";

export default class UserRepository implements IUserRepository<any> {
    db: Connection
    books = [
        {id: 1, name: 'The Pragmatic Programmer'},
        {id: 2, name: 'Poems that Solve Puzzles'},
    ];

    constructor(db: Connection) {
        this.db = db;
    }

    findBy(): Promise<IUser[] | undefined> {
        let output: IUser[];
        let data = this.db.query("SELECT * FROM user LIMIT 1", function (err, results, fields) {
            console.log(results);
            console.log(fields);
        })
        return Promise.resolve(undefined);
        // return Promise.resolve(this.books);
    }

    findOneBy(): Promise<IUser | undefined> {
        let output: IUser;
        let data = this.db.query("SELECT * FROM user LIMIT 1", function (err, results, fields) {
            console.log(results);
            console.log(fields);
        })
        return Promise.resolve(undefined);
        // return Promise.resolve(this.books);
    }
}