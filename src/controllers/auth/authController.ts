import {AuthService} from "@src/services/auth/authService";
import {Request, Response, Router} from "express";
import asyncWrapper from "@helpers/asyncWrapper";
import {loginValidation} from "@src/validations/auth.validation";
import {responseJSON} from "@helpers/response";
import httpStatus from "http-status";

export default class AuthController {
    authService: AuthService;
    postLogin = asyncWrapper(async (req: Request, res: Response) => {
        let email: string = req.body.email;
        let password: string = req.body.password;
        // Validate Login
        loginValidation(email, password)
        // Response from service
        let response = await this.authService.login(email, password)
        responseJSON(res, httpStatus.OK, response, "Login berhasil")
    });

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    routes(router: Router): Router {
        const v1Auth = Router();
        v1Auth.post("/login", this.postLogin);

        router.use("/api/v1/auth", v1Auth);
        return router;
    }
}
