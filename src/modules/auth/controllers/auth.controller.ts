import {AuthService} from "@modules/auth/services/auth.service";
import {Request, Response, Router} from "express";
import asyncWrapper from "@helpers/asyncWrapper";
import {loginValidation, registerValidation} from "@modules/auth/validations/auth.validation";
import {responseJSON} from "@helpers/response";
import httpStatus from "http-status";
import {ILoginRequest} from "@modules/auth/interfaces/login.interface";
import {IRegisterRequest} from "@modules/auth/interfaces/register.interface";

export default class AuthController {
    authService: AuthService;
    postLogin = asyncWrapper(async (req: Request, res: Response) => {
        let request: ILoginRequest = {
            email: req.body.email,
            password: req.body.password
        }

        // Validate Login
        loginValidation(request)
        // Response from service
        let response = await this.authService.login(request)
        responseJSON(res, httpStatus.OK, response, "Login berhasil")
    });

    postRegister = asyncWrapper(async (req: Request, res: Response) => {
        let request: IRegisterRequest = {
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            fullname: req.body.fullname,
        }

        // Validate Register
        registerValidation(request)
        // Response from service
        let response = await this.authService.register(request)
        responseJSON(res, httpStatus.OK, null, response.message)
    });

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    routes(router: Router): Router {
        const v1Auth = Router();
        v1Auth.post("/login", this.postLogin);
        v1Auth.post("/register", this.postRegister);

        router.use("/api/v1/auth", v1Auth);
        return router;
    }
}
