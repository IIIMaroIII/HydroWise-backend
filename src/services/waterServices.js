import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';
import { Models } from '../db/models/index.js';

const addWaterVolume = async ({ userId, time, waterValue }) => {
  const volumeRecord = await Models.WaterModel.create({
    userId: userId,
    date: time,
    volume: waterValue,
  });
  return volumeRecord;
};

const updateWaterVolume = async (id, { userId, ...payload }) => {
  const volumeRecord = await Models.WaterModel.findOneAndUpdate(
    { _id: id, userId: userId },
    { ...payload },
    { new: true },
  );
  return volumeRecord;
};

const deleteWaterVolume = async (userId, id) => {
  const volumeRecord = await Models.WaterModel.findOneAndDelete({
    _id: id,
    userId,
  });
  return volumeRecord;
};

const getDailyWaterVolume = async ({ userId, formattedDateObj }) => {
  const start = startOfDay(formattedDateObj);
  const end = endOfDay(formattedDateObj);

  const dailyItems = await Models.WaterModel.find(
    {
      userId,
      date: { $gte: start, $lte: end },
    },
    {
      createdAt: 0,
      updatedAt: 0,
    },
  );
  return dailyItems;
};

const getMonthlyWaterVolume = async ({ userId, formattedDateObj }) => {
  const start = startOfMonth(formattedDateObj);
  const end = endOfMonth(formattedDateObj);

  const monthlyItems = await Models.WaterModel.find(
    {
      userId,
      date: { $gte: start, $lte: end },
    },
    {
      createdAt: 0,
      updatedAt: 0,
    },
  );
  return monthlyItems;
};

export const water = {
  addWaterVolume,
  updateWaterVolume,
  deleteWaterVolume,
  getDailyWaterVolume,
  getMonthlyWaterVolume,
};
