import Joi from "joi";
import validation from "./validation";

const rgisterSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  middleName: Joi.string().min(2).max(100),
  lastName: Joi.string().min(2).max(100).required(),
  phone: Joi.string().pattern(new RegExp("^[0-9]{8,20}$")).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
    .min(2)
    .max(10)
    .required(),
  imgUrl: Joi.string(),
  imgAlt: Joi.string().min(2).max(100),
  state: Joi.string().min(2).max(100).required(),
  country: Joi.string().min(2).max(100).required(),
  city: Joi.string().min(2).max(100).required(),
  street: Joi.string().min(2).max(100).required(),
  houseNumber: Joi.number().min(2).max(100).required(),
  zipCode:
    Joi.number()
    .required(),
});
const validetionRegisterSchema = (userInput) =>
  validation(rgisterSchema, userInput);

export default validetionRegisterSchema;
