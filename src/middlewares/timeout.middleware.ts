import {NextFunction, Request, Response} from "express";
import httpStatus from "http-status";

export const timeOutMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.setTimeout(4000, function () {
        console.log('Request has timed out.');
        res.sendStatus(httpStatus.GATEWAY_TIMEOUT);
    });
    next();
}