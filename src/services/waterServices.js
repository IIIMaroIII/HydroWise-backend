
import { Models } from '../db/models/index.js';
 
 
const addWaterVolume = async ({userId,data,...payload }) => {
  const volumeRecord = await Models.WaterModel.create({
    ...payload,
    userId: userId,
    data:data,
  });
  return volumeRecord;
};


const updateWaterVolume= async (id, {userId,...payload }) => {
  const volumeRecord = await Models.WaterModel.findOneAndUpdate({ _id: id, userId: userId },
    { ...payload},
    { new: true });
  return volumeRecord;
};

const deleteWaterVolume = async (userId, id) => {
  const volumeRecord = await Models.WaterModel.findOneAndDelete({_id: id, userId });
  return volumeRecord;
};

const getDailyWaterVolume = async (userId, dateRange) => {
  const volumeRecords = await Models.WaterModel.find({
        userId: userId,
        date: dateRange
    });
  return volumeRecords;
};

const getMonthlyWaterVolume = async (userId, dateRange) => {
    const volumeRecords = await Models.WaterModel.find({
        userId: userId,
        date: dateRange
    });
    return volumeRecords;
};

export const water = {
  addWaterVolume,
  updateWaterVolume,
  deleteWaterVolume,
  getDailyWaterVolume,
  getMonthlyWaterVolume,
};