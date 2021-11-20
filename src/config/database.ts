import {config} from "@src/config/index";
import mysql, {Connection} from 'mysql2';

class Database {
    connect(): Connection {
        return mysql.createConnection({
            host: config.DB_HOST,
            user: config.DB_USER,
            password: config.DB_PASS,
            database: config.DB_NAME,
            port: Number(config.DB_PORT),
        });
    }
}

export default Database