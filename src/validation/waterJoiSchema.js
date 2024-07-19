import Joi from 'joi';


const addWaterSchema = Joi.object({
  userId: Joi.string(),
  waterValue: Joi.number().required(),
  time: Joi.string().required()
});

const editWaterSchema = Joi.object({
  waterValue: Joi.number(),
  time: Joi.string()
});

// const getDailyWaterSchema = Joi.object({
//   userId: Joi.string(),
//   date: Joi.date()
// });

// const getMonthlyWaterSchema = Joi.object({
//   userId: Joi.string(),
//   month: Joi.number().min(1).max(12),
//   year: Joi.number().min(2000).max(new Date().getFullYear())
// });


export const water = {
    addWaterSchema,
    editWaterSchema,
    // getDailyWaterSchema,
    // getMonthlyWaterSchema
};