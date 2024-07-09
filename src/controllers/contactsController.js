import { CLOUDINARY } from '../constants/constants.js';
import { Services } from '../services/index.js';
import { HttpError } from '../utils/HttpError.js';
import { env } from '../utils/env.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

const homeController = (req, res) => {
  res.json(
    ResponseMaker(200, 'Hey, what`s been up? This is my first backend`s!'),
  );
};

const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const result = await Services.contacts.getAllContacts({
    userId: req.user.id,
    page,
    perPage,
    sortOrder,
    sortBy,
    filterObj: filter,
  });
  res.json(
    ResponseMaker(200, 'The contacts have been successfully found!', result),
  );
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Services.contacts.getContactById({
    _id: contactId,
    userId: req.user.id,
  });

  if (!result) {
    return next(
      HttpError(404, `The contact with id ${contactId} was not found!`),
    );
  }
  res.json(
    ResponseMaker(
      200,
      `Successfully found contact with id ${contactId}!`,
      result,
    ),
  );
};

const addNewContactController = async (req, res, next) => {
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await Services.contacts.addNewContact({
    ...req.body,
    userId: req.user.id,
    photo: photoUrl,
  });

  if (!result) return next(HttpError(400, 'Bad request!'));
  res
    .status(201)
    .json(ResponseMaker(201, 'Successfully created a contact!', result));
};

const updateContactController = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;
  const { id: userId } = req.user;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env(CLOUDINARY.ENABLE_CLOUDINARY) === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await Services.contacts.updateContact(
    { contactId, userId },
    { ...body, photo: photoUrl },
  );

  if (!result) {
    return next(HttpError(404, `The contact with ${contactId} was not found!`));
  }

  res.json(
    ResponseMaker(
      200,
      `Successfully updated a contact by id ${contactId}}!`,
      result,
    ),
  );
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Services.contacts.deleteContact({
    _id: contactId,
    userId: req.user.id,
  });

  if (!result) {
    return next(
      HttpError(404, `The contact with id ${contactId} was not found!`),
    );
  }

  res.status(204).send();
};

export const contacts = {
  homeController,
  getAllContactsController,
  getContactByIdController,
  addNewContactController,
  updateContactController,
  deleteContactController,
};
