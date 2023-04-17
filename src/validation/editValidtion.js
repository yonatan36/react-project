import Joi from "joi";

import validation from "./validation";

const editCardSchema = Joi.object({
  id: Joi.string().min(1).required(),
  img: Joi.string().required(),
  title: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required().min(3).max(2500),
});

const editCardParamsSchema = Joi.object({
  id: Joi.string().min(1).required(),
});

const validateEditSchema = (userInput) => validation(editCardSchema, userInput);

const validateEditCardParamsSchema = (userInput) =>
  validation(editCardParamsSchema, userInput);

export { validateEditCardParamsSchema };

export default validateEditSchema;
