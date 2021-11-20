import {ValidationError} from "joi";
import httpStatus from "http-status";

class ValidationException extends Error {
    status: number;
    message: string;

    constructor(error: ValidationError) {
        super();
        this.status = httpStatus.BAD_REQUEST;
        this.message = error.message;
    }
}

export default ValidationException;