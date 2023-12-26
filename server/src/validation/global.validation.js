import Joi from "joi";

export const validateId = (id) => {
  const Schema = Joi.object({
    _id: Joi.string().required(),
  });

  return Schema.validateAsync(id);
};

export const validateCategory = (category) => {
  const Schema = Joi.object({
    category: Joi.string().required(),
  });

  return Schema.validateAsync(category);
};
