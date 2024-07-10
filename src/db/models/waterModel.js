import { model, Schema } from 'mongoose';
import { handleMongooseError } from '../../utils/handleMongooseError.js';

const waterSchema = new Schema({});

waterSchema.post('save', handleMongooseError);

export const waterModel = model('water', waterSchema);
