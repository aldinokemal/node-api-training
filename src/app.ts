import express from 'express';
import {logger} from "@src/helpers/logger";
import bodyParser from "body-parser";
import AuthController from "@src/controllers/auth/authController";
import UserRepository from "@src/data-access/repositories/mysql/userRepository";
import {AuthService} from "@src/services/auth/authService";
import {errorMiddleware, timeOutMiddleware} from "@src/middlewares";
import {responseJSON} from "@helpers/response";
import multerParser from "multer";
import Database from "@src/config/database";

class Server {
    app = express()
    port: number = 8080;

    applyMiddleware() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(multerParser().any())
        this.app.use(timeOutMiddleware)
    }

    applyErrorMiddleware() {
        this.app.use(errorMiddleware)
    }

    start() {
        // Database
        const db = new Database().connect()

        // Repositoru
        const userRepository = new UserRepository(db)
        // Service
        const authService = new AuthService(userRepository)
        // Controller
        const authController = new AuthController(authService)

        // Running Routes
        this.applyMiddleware()
        authController.routes(this.app)
        this.applyErrorMiddleware();

        this.app.get('/health', (req, res) => {
            responseJSON(res, 200, null, "Normal")
        });
        this.app.listen(this.port, async () => {
            logger.log(`listening to port:${this.port}`);
        })
    }
}

export const server = new Server();