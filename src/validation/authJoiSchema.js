import joi from 'joi';

const registerUserSchema = joi.object({
  email: joi
    .string()
    .trim()
    .lowercase()
    .email()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({
      'string.email':
        'Please fill a valid email address in lowercase. Examples of valid email addresses: john.doe@example.com, john-doe@example.com, john@example.co.uk,john.doe@example.co.in',
      'any.required': 'Email address is required',
    }),
  password: joi.string().min(3).max(32).required().messages({
    'any.required': 'Password is required!',
  }),
});

const loginUserSchema = joi.object({
  email: joi
    .string()
    .trim()
    .lowercase()
    .email()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({
      'string.email':
        'Please fill a valid email address in lowercase. Examples of valid email addresses: john.doe@example.com, john-doe@example.com, john@example.co.uk,john.doe@example.co.in',
      'any.required': 'Email address is required',
    }),
  password: joi.string().required().messages({
    'any.required': 'Password is required!',
  }),
});

const updateUserSchema = joi.object({
  name: joi.string().min(2).max(32).allow('').trim().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least 2 characters',
    'string.max': 'Name should have at most 32 characters',
  }),
  gender: joi
    .string()
    .valid('woman', 'man')
    .default('woman')
    .required()
    .messages({
      'string.base': 'The gender must be a string',
      'any.required': 'The gender is required',
    }),
  dailyNorma: joi
    .number()
    .positive('Value must be a positive number')
    .precision(1)
    .required()
    .messages({
      'string.base': 'The daily norma must be a number',
      'any.required': 'The daily norma is required',
    }),
  weight: joi.number().positive().required().messages({
    'string.base': 'The weight must be a number',
    'any.required': 'The weight is required',
  }),
  photoUrl: joi.string().trim(),
  activeTime: joi.number().required().messages({
    'string.base': 'The weight must be a number',
    'any.required': 'The weight is required',
  }),
  email: joi
    .string()
    .allow('')
    .trim()
    .lowercase()
    .email()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .messages({
      'string.base': 'Email should be a string',
      'string.email': 'Email is not valid',
    }),
});

const requestResetPasswordSchema = joi.object({
  email: joi
    .string()
    .trim()
    .lowercase()
    .email()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({
      'string.email':
        'Please fill a valid email address in lowercase. Examples of valid email addresses: john.doe@example.com, john-doe@example.com, john@example.co.uk,john.doe@example.co.in',
      'any.required': 'Email address is required',
    }),
});

const resetPwdSchema = joi.object({
  token: joi.string().required().messages({
    'any.required': 'Token is required!',
  }),
  password: joi.string().required().messages({
    'any.required': 'Password is required!',
  }),
});

const loginWithGoogleAuthSchema = joi.object({
  code: joi.string().required().messages({
    'any.required': 'Code is required!',
    'string.code': 'Code must be a string!',
  }),
});

export const auth = {
  registerUserSchema,
  loginUserSchema,
  requestResetPasswordSchema,
  resetPwdSchema,
  loginWithGoogleAuthSchema,
  updateUserSchema,
};
