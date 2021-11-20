import {Response} from "express";

export const responseJSON = (res: Response, code: number, data: any, message?: string) => {
    let output = {
        code: code,
        message: message,
        results: data || null,
    }

    res.status(code).send(output);
}