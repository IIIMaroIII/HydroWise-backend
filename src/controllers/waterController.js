import mongoose from 'mongoose';
import { Services } from '../services/index.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { HttpError } from '../utils/HttpError.js';
import { parseISO } from 'date-fns';
import { generateData } from '../utils/generateVolumesForDB.js';

const addWaterVolumeController = async (req, res) => {
  const { waterValue, time } = req.body;
  const formattedDateObj = parseISO(time);
  const volumeRecord = await Services.water.addWaterVolume({
    waterValue,
    formattedDateObj,
    userId: req.user._id,
  });
  res.json(
    ResponseMaker(201, 'Successfully add a water volume!', volumeRecord),
  );
};

const editWaterVolumeController = async (req, res, next) => {
  const id = req.params.id;
  const { waterValue, time } = req.body;
  const formattedDateObj = parseISO(time);
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(HttpError(404, 'Record not found'));

  const volumeRecord = await Services.water.updateWaterVolume({
    id,
    userId: req.user._id,
    waterValue,
    formattedDateObj,
  });
  if (!volumeRecord) return next(HttpError(404, 'Record not found'));
  res.json(
    ResponseMaker(200, 'Successfully change a water volume!', volumeRecord),
  );
};

const deleteWaterVolumeController = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    // проверить вроде мтддлвар глобальный должен быть
    return next(HttpError(404, 'Record not found'));
  const volumeRecord = await Services.water.deleteWaterVolume(req.user.id, id);
  if (!volumeRecord) return next(HttpError(404, 'Record not found'));
  res.status(204).send();
};

const getDailyWaterVolumeController = async (req, res) => {
  const { chosenDate } = req.query;
  console.log('chosenDate in controller', chosenDate);

  generateData(req.user._id);

  const data = await Services.water.getDailyWaterVolume({
    userId: req.user._id,
    chosenDate,
  });

  res.json(
    ResponseMaker(
      200,
      'You’ve successfully fetched your volumes for the chosen day!',
      data,
    ),
  );
};

const getMonthlyWaterVolumeController = async (req, res, next) => {
  const { chosenDate } = req.query;
  console.log('chosenDate in controller', chosenDate);

  generateData(req.user.id);

  const data = await Services.water.getMonthlyWaterVolume({
    userId: req.user._id,
    chosenDate,
  });

  res.json(
    ResponseMaker(
      200,
      'You’ve successfully fetched your monthly volumes!',
      data,
    ),
  );
};

export const water = {
  addWaterVolumeController,
  editWaterVolumeController,
  deleteWaterVolumeController,
  getDailyWaterVolumeController,
  getMonthlyWaterVolumeController,
};
