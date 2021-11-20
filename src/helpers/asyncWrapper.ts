import {NextFunction, Request, Response} from 'express';

const asyncWrapper = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error: Error) => next(error));
};

export default asyncWrapper;
