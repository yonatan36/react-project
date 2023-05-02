import Joi from "joi";
import validation from "./validation";

const profileSchema = Joi.object({
  firstName: Joi.string().min(2).max(100).required(),
  middleName: Joi.string().min(2).max(100),
  lastName: Joi.string().min(2).max(100).required(),
  phone: Joi.string().pattern(new RegExp("^[0-9]{8,20}$")).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  imageUrl: Joi.string(),
  imageAlt: Joi.string().min(2).max(100),
  state: Joi.string().min(2).max(100).required(),
  country: Joi.string().min(2).max(100).required(),
  city: Joi.string().min(2).max(100).required(),
  street: Joi.string().min(2).max(100).required(),
  houseNumber: Joi.number().min(2).max(100).required(),
  zipCode: Joi.number().required(),
});
const validetionProfileSchema = (userInput) =>
  validation(profileSchema, userInput);

export default validetionProfileSchema;
