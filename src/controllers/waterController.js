import mongoose from 'mongoose';
import { Services } from '../services/index.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { HttpError } from '../utils/HttpError.js';
import { parseValue } from '../utils/parseValue.js';
import { parseDate } from '../utils/parseDate.js';
import { parseISO } from 'date-fns';
import { WaterModel } from '../db/models/waterModel.js';
import { waterEntries } from '../utils/generateWaterVolume.js';

const addWaterVolumeController = async (req, res) => {
  const isoDateString = parseDate(req.body.time);

  const waterValue = parseValue(req.body.waterValue);
  const volumeRecord = await Services.water.addWaterVolume({
    waterValue,
    userId: req.user._id,
    time: isoDateString,
  });
  res.json(
    ResponseMaker(201, 'Successfully add a water volume!', volumeRecord),
  );
};

const editWaterVolumeController = async (req, res, next) => {
  const id = req.params.id;
  const isoDateString = parseDate(req.body.time);
  const waterValue = parseValue(req.body.waterValue);

  if (!mongoose.Types.ObjectId.isValid(id))
    return next(HttpError(404, 'Record not found'));

  const volumeRecord = await Services.water.updateWaterVolume(id, {
    volume: waterValue,
    userId: req.user._id,
    date: isoDateString,
  });
  if (!volumeRecord) return next(HttpError(404, 'Record not found'));
  res.json(
    ResponseMaker(200, 'Successfully change a water volume!', volumeRecord),
  );
};

const deleteWaterVolumeController = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(HttpError(404, 'Record not found'));
  const volumeRecord = await Services.water.deleteWaterVolume(req.user._id, id);
  if (!volumeRecord) return next(HttpError(404, 'Record not found'));
  res.status(204).send();
};

const getDailyWaterVolumeController = async (req, res) => {
  const { chosenDate } = req.query;
  const formattedDateObj = parseISO(chosenDate);
  const id = req.user.id;
  await WaterModel.insertMany(waterEntries(id));
  const data = await Services.water.getDailyWaterVolume({
    userId: id,
    formattedDateObj,
  });

  await WaterModel.deleteMany({ userId: id });

  // if (data.length === 0)
  //   return HttpError(404, 'We have not found volumes according to chosen day');

  res.json(
    ResponseMaker(
      200,
      'You`ve successfully fetched your volumes for chosen day!!! ',
      data,
    ),
  );
};

const getMonthlyWaterVolumeController = async (req, res, next) => {
  const { chosenDate } = req.query;
  const formattedDateObj = parseISO(chosenDate);
  const id = req.user.id;
  await WaterModel.insertMany(waterEntries(id));
  const data = await Services.water.getMonthlyWaterVolume({
    userId: id,
    formattedDateObj,
  });
  await WaterModel.deleteMany({ userId: id });

  // if (data.length === 0)
  //   return HttpError(
  //     404,
  //     'We have not found volumes according to chosen month',
  //   );

  res.json(
    ResponseMaker(
      200,
      'You`ve successfully fetched your monthly volumes!!! ',
      data,
    ),
  );
  // const { month, year } = req.params;
  // const monthInt = parseInt(month);
  // const yearInt = parseInt(year);

  // const volumeRecords = await Services.water.getMonthlyWaterVolume(
  //   req.user._id,
  //   { month: monthInt, year: yearInt },
  // );

  // if (!volumeRecords || volumeRecords.length === 0) {
  //   return next(
  //     HttpError(404, 'No records found for the specified month and year'),
  //   );
  // }

  // const dailyVolumes = {};
  // volumeRecords.forEach((record) => {
  //   const day = record.date.day;
  //   if (!dailyVolumes[day]) {
  //     dailyVolumes[day] = 0;
  //   }
  //   dailyVolumes[day] += record.volume;
  // });

  // const result = Object.keys(dailyVolumes).map((day) => ({
  //   day: parseInt(day),
  //   totalVolume: dailyVolumes[day],
  // }));

  // res.json(
  //   ResponseMaker(200, 'Successfully get a monthly water volume!', result),
  // );
};

export const water = {
  addWaterVolumeController,
  editWaterVolumeController,
  deleteWaterVolumeController,
  getDailyWaterVolumeController,
  getMonthlyWaterVolumeController,
};
