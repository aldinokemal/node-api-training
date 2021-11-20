import {NextFunction, Request, Response} from "express";
import InternalException from "@errors/internalError";
import httpStatus from "http-status";
import ValidationException from "@errors/validationError";
import {responseJSON} from "@helpers/response";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof InternalException) {
        responseJSON(res, err.status, null, err.message)
    } else if (err instanceof ValidationException) {
        responseJSON(res, err.status, null, err.message)
    } else {
        responseJSON(res, httpStatus.INTERNAL_SERVER_ERROR, null, "Something Erorr")
    }
}