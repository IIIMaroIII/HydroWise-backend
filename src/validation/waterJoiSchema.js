import Joi from 'joi';


const addWaterSchema = Joi.object({
  userId: Joi.string(),
  volume: Joi.number().positive().required(),
  date: Joi.date(),
  // time: Joi.string().required()
});

const editWaterSchema = Joi.object({
  volume: Joi.number().positive(),
  time: Joi.string()
});

const getDailyWaterSchema = Joi.object({
  userId: Joi.string(),
  date: Joi.date()
});

const getMonthlyWaterSchema = Joi.object({
  userId: Joi.string(),
  month: Joi.number().min(1).max(12),
  year: Joi.number().min(2000).max(new Date().getFullYear())
});


export const water = {
    addWaterSchema,
    editWaterSchema,
    getDailyWaterSchema,
    getMonthlyWaterSchema
};