const Joi = require("joi");

export const loginSchema = Joi.object({
    email: Joi.string().min(5).required(),
    password: Joi.string().min(5).required()
});

export const registerSchema = loginSchema.append({
    confirmPassword: Joi.string().min(5).required(),
}).custom((schema) => {
    if (schema.password !== schema.confirmPassword) {
        throw new Error("Confirm your password!");
    }

    return schema;
});
