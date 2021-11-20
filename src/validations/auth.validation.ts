import Joi from "joi";
import ValidationException from "@errors/validationError";

export const loginValidation = (email: string, password: string) => {
    const schema = Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().required().min(4)
    })
    const validate = schema.validate({email, password})
    if (validate.error != undefined) {
        throw new ValidationException(validate.error)
    }
}