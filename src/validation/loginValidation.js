import Joi from "joi";
import validation from "./validation";

const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .min(2)
    .max(10)
    .required(),
});
const validetionLoginSchema = (userInput) =>
  validation(LoginSchema, userInput);

export default validetionLoginSchema;
