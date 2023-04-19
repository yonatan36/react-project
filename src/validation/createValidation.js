import Joi from "joi";

import validation from "./validation";

const CreateCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subTitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  country: Joi.string().min(2).max(1024).required(),
  city: Joi.string().min(2).max(1024).required(),
  street: Joi.string().min(2).max(1024).required(),
  houseNumber: Joi.number().required(),
  email: Joi.string().min(2).max(1024).required(),
  phone: Joi.string().min(9).max(14).required(),
  url: Joi.string().min(6).max(1024).allow(""),
  alt: Joi.string().min(2).max(256).allow(""),
});

const CreateCardParamsSchema = Joi.object({
  id: Joi.string().min(1).required(),
});

const validateCreateSchema = (userInput) => validation(CreateCardSchema, userInput);

const validateCreateCardParamsSchema = (userInput) =>
  validation(CreateCardParamsSchema, userInput);

export { validateCreateCardParamsSchema };

export default validateCreateSchema;
