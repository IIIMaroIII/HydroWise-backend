import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../../utils/handleMongooseError.js';

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name is required!'] },
    userId: { type: String, required: [true, 'UserId is required!'] },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required!'],
    },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['home', 'personal'],
    },
    photo: { type: String },
  },
  { timestamps: true, versionKey: false },
);

contactSchema.post('save', handleMongooseError);

export const ContactModel = model('contact', contactSchema);
