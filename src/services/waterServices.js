
import { Models } from '../db/models/index.js';
 
 
const addWaterVolume = async ({userId,...payload }) => {
  const volumeRecord = await Models.WaterModel.create({
    ...payload,
    userId: userId,
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

const getDailyWaterVolume = async (userId, date) => {
  const volumeRecords = await Models.WaterModel.find({date: date, userId });
  return volumeRecords;
};

const getMonthlyWaterVolume = async (userId, { month, year }) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const records = await Models.WaterModel.find({
      userId,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });
    return records;
    
};

export const water = {
  addWaterVolume,
  updateWaterVolume,
  deleteWaterVolume,
  getDailyWaterVolume,
  getMonthlyWaterVolume,
};