import Joi from "joi";

export const validateSignUp = (userData) => {
  const Schema = Joi.object({
    username: Joi.string().required().min(5),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    address: Joi.array().items(Joi.object({ details: Joi.string() })),
    phoneNumber: Joi.array().items(Joi.number().min(10).max(10)),
  });

  return Schema.validateAsync(userData);
};

export const validateSignIn = (userData) => {
  const Schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string(),
  });

  return Schema.validateAsync(userData);
};
