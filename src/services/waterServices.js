import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';
import { Models } from '../db/models/index.js';
import { startOfDayUtc } from '../utils/startOfDayUTC.js';
import { endOfDayUtc } from '../utils/endOfDayUTC.js';
import { HttpError } from '../utils/HttpError.js';
import { getStartAndEndOfDay } from '../utils/getStartAndEndOfDay.js';
import { getStartAndEndOfMonth } from '../utils/getStartAndEndOfMonth.js';

const addWaterVolume = async ({ userId, formattedDateObj, waterValue }) => {
  const volumeRecord = await Models.WaterModel.create({
    userId: userId,
    date: formattedDateObj,
    volume: waterValue,
  });
  return volumeRecord;
};

const updateWaterVolume = async ({
  id,
  userId,
  formattedDateObj,
  waterValue,
}) => {
  const volumeRecord = await Models.WaterModel.findOneAndUpdate(
    { _id: id, userId: userId },
    {
      date: formattedDateObj,
      volume: waterValue,
    },
    { new: true },
  );
  return volumeRecord;
};

const deleteWaterVolume = async (userId, id) => {
  const volumeRecord = await Models.WaterModel.deleteOne({
    _id: id,
    userId,
  });
  return volumeRecord;
};

const getDailyWaterVolume = async ({ userId, chosenDate }) => {
  console.log('chosenDate in service', chosenDate);
  console.log('chosenDate.toString()', chosenDate.toString());
  console.log('chosenDate.toLocaleString()', chosenDate.toLocaleString());

  // const start = startOfDay(chosenDate.toLocaleString());
  // console.log('start', start);
  // const end = endOfDay(chosenDate.toLocaleString());
  // console.log('end', end);

  const { start, end } = getStartAndEndOfDay(chosenDate);
  console.log('start', start);
  console.log('end', end);

  try {
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
    if (dailyItems?.length === 0)
      throw HttpError(
        404,
        'Unfortunately we have not found any records according chosen date',
      );

    return dailyItems;
  } catch (err) {
    console.log('err', err);
  }
};

/* const getMonthlyWaterVolume = async ({ userId, month, year }) => {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(new Date(year, month - 1));

  const monthlyItems = await Models.WaterModel.find({
    userId: userId,
    date: { $gte: start, $lte: end },
  }); */

const getMonthlyWaterVolume = async ({ userId, chosenDate }) => {
  const { start, end } = getStartAndEndOfMonth(chosenDate);

  try {
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

    if (monthlyItems?.length === 0)
      return HttpError(
        404,
        'Unfortunately we have not found any records according chosen date',
      );

    return monthlyItems;
  } catch (err) {
    return HttpError(500, 'Internal server error', err);
  }
};

export const water = {
  addWaterVolume,
  updateWaterVolume,
  deleteWaterVolume,
  getDailyWaterVolume,
  getMonthlyWaterVolume,
};
