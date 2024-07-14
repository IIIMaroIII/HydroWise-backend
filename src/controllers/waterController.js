
import mongoose from 'mongoose';
import { Services } from '../services/index.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { HttpError } from '../utils/HttpError.js';


const addWaterVolumeController = async (req, res) => {
    const date = new Date();
    const volumeRecord = await Services.water.addWaterVolume({ ...req.body, userId: req.user._id, date });
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
    let { date } = req.query;
     if (!date) {
    date = new Date();
  } else {
    date = new Date(date);
    };
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));
    const volumeRecords = await Services.water.getDailyWaterVolume(req.user._id, { $gte: startOfDay, $lte: endOfDay } );
    // const totalVolume = volumeRecords.reduce((total, record) => total + record.volume, 0);
    res.json(ResponseMaker(200, 'Successfully get a daily water volume!', volumeRecords));
};


const getMonthlyWaterVolumeController = async (req, res)=>{
    let { date } = req.query;

    if (!date) {
        date = new Date();
    } else {
        date = new Date(date);
    }

    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
    const volumeRecords = await Services.water.getMonthlyWaterVolume(req.user._id, { $gte: startOfMonth, $lte: endOfMonth });
    res.json(ResponseMaker(200, 'Successfully get a monthly water volume!', volumeRecords));
        
};

export const water = {
    addWaterVolumeController,
    editWaterVolumeController,
    deleteWaterVolumeController,
    getDailyWaterVolumeController,
    getMonthlyWaterVolumeController,
};

