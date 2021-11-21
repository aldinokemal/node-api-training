import Joi from "joi";
import ValidationException from "@errors/validationError";
import {ILoginRequest} from "@modules/auth/interfaces/login.interface";
import {IRegisterRequest} from "@modules/auth/interfaces/register.interface";

export const loginValidation = (data: ILoginRequest) => {
    const schema = Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().required().min(4),
    })
    const validate = schema.validate({email: data.email, password: data.password})
    if (validate.error != undefined) {
        throw new ValidationException(validate.error)
    }
}
export const registerValidation = (data: IRegisterRequest) => {
    const schema = Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().required().min(4),
        gender: Joi.string().required().valid('male', 'female'),
        fullname: Joi.string().required(),
    })
    const validate = schema.validate({
        email: data.email,
        password: data.password,
        gender: data.gender,
        fullname: data.fullname
    })
    if (validate.error != undefined) {
        throw new ValidationException(validate.error)
    }
}