import {AuthService} from "@src/services/auth/authService";
import {Request, Response, Router} from "express";
import asyncWrapper from "@helpers/asyncWrapper";
import {loginValidation} from "@src/validations/auth.validation";

export default class AuthController {
    authService: AuthService;
    postLogin = asyncWrapper(async (req: Request, res: Response) => {
        console.log(req.body);
        console.log(req.files)

        let accountID: string = req.body.email;
        let password: string = req.body.password;
        // Validate Login
        loginValidation(accountID, password)

        let response = await this.authService.login(accountID, password)
        res.status(200).send(response)
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
