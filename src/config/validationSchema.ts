import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  API_PREFIX: Joi.string().required(),
  CONTEXT: Joi.string().required(),
  ORIGINS: Joi.string().required(),
  ALLOWED_HEADERS: Joi.string().required(),
  ALLOWED_METHODS: Joi.string().required(),
  CORS_ENABLED: Joi.string().required(),
  CORS_CREDENTIALS: Joi.string().required(),
  SWAGGER_PATH: Joi.string().required(),
  SWAGGER_ENABLED: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_LOGGIN: Joi.string().required(),
  DB_TYPE: Joi.string().required(),
  DB_SYNC: Joi.number().required(),

  STRIPE_SECRET_KEY: Joi.string(),
  STRIPE_CURRENCY: Joi.string(),
  FRONTEND_URL: Joi.string(),
});
