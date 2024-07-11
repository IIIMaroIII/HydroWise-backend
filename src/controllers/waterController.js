
import mongoose from 'mongoose';
import { Services } from '../services/index.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { HttpError } from '../utils/HttpError.js';


const addWaterVolumeController = async (req, res) => {
    const volumeRecord = await Services.water.addWaterVolume({ ...req.body, userId: req.user._id });
    res.json(ResponseMaker(201, 'Successfully add a water volume!', volumeRecord));
};


const editWaterVolumeController = async (req, res,next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(HttpError(404, 'Record not found'));
        
    const volumeRecord = await  Services.water.updateWaterVolume(id, { ...req.body, userId: req.user._id});
    if (!volumeRecord)  return  next(HttpError(404, 'Record not found'));
    res.json(ResponseMaker(200, 'Successfully change a water volume!', volumeRecord));
};

const deleteWaterVolumeController = async (req, res,next) => {
    const id = req.params.id;
     if (!mongoose.Types.ObjectId.isValid(id)) return next(HttpError(404, 'Record not found'));
    const volumeRecord = await  Services.water.deleteWaterVolume(req.user._id, id);
    if (!volumeRecord) return next(HttpError(404, 'Record not found'));
    res.status(204).send();
};

const getDailyWaterVolumeController = async (req, res) => {
    const date = req.query.date;
    const userId = req.user._id;
    const volumeRecords = await Services.water.getDailyWaterVolume(userId, date);
    const totalVolume = volumeRecords.reduce((total, record) => total + record.volume, 0);
    res.json(ResponseMaker(200, 'Successfully get a daily water volume!', {date, totalVolume, entries: volumeRecords }));
};


const getMonthlyWaterVolumeController = async (req, res)=>{
    const { month, year } = req.query;
    const userId = req.user._id;
    const records = await Services.water.getMonthlyWaterVolume(userId, { month, year });
    const dailyVolumes = records.reduce((acc, record) => {
      const dateStr = record.date;
      if (!acc[dateStr]) {
        acc[dateStr] = 0;
      }
      acc[dateStr] += record.volume;
      return acc;
    }, {});

    const dailyVolumeArray = Object.keys(dailyVolumes).map(date => ({
      date,
      volume: dailyVolumes[date]
    }));
    res.json( ResponseMaker(200, 'Successfully get a monthly water volume!', {
        month,
        year,
        totalVolume: records.reduce((total, record) => total + record.volume, 0),
        entries: dailyVolumeArray})
    );
};

export const water = {
    addWaterVolumeController,
    editWaterVolumeController,
    deleteWaterVolumeController,
    getDailyWaterVolumeController,
    getMonthlyWaterVolumeController,
};

