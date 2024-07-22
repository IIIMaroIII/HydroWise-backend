import Joi from 'joi';

const addWaterSchema = Joi.object({
  userId: Joi.string(),
  waterValue: Joi.number().required(),
  date: Joi.date().required(),
});

const editWaterSchema = Joi.object({
  waterValue: Joi.number(),
  time: Joi.string(),
});

export const water = {
  addWaterSchema,
  editWaterSchema,
  // getDailyWaterSchema,
  // getMonthlyWaterSchema
};
