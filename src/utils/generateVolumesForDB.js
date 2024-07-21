import mongoose from 'mongoose';
import { WaterModel } from '../db/models/waterModel.js';
import { addDays, setHours, setMinutes, formatISO } from 'date-fns';

export const generateData = async (id) => {
  const userId = new mongoose.Types.ObjectId(id); // Пример ID пользователя
  const baseDateJune = new Date('2024-06-01T00:00:00Z');
  const baseDateJuly = new Date('2024-07-01T00:00:00Z');
  const baseDateAugust = new Date('2024-08-01T00:00:00Z');

  try {
    for (let i = 0; i < 3; i++) {
      const randomHour = Math.floor(Math.random() * 24);
      const randomMinute = Math.floor(Math.random() * 60);

      let dateJune = addDays(baseDateJune, i);
      dateJune = setHours(dateJune, randomHour);
      dateJune = setMinutes(dateJune, randomMinute);

      let dateJuly = addDays(baseDateJuly, i);
      dateJuly = setHours(dateJuly, randomHour);
      dateJuly = setMinutes(dateJuly, randomMinute);

      let dateAugust = addDays(baseDateAugust, i);
      dateAugust = setHours(dateAugust, randomHour);
      dateAugust = setMinutes(dateAugust, randomMinute);

      await WaterModel.create({
        userId,
        date: formatISO(dateJune),
        volume: Math.floor(Math.random() * 100 + 100), // Случайный объем от 100 до 200
      });

      await WaterModel.create({
        userId,
        date: formatISO(dateJuly),
        volume: Math.floor(Math.random() * 100 + 100),
      });

      await WaterModel.create({
        userId,
        date: formatISO(dateAugust),
        volume: Math.floor(Math.random() * 100 + 100),
      });
    }
    console.log('Data successfully created!');
  } catch (err) {
    console.error('Error creating data:', err);
  }
};
