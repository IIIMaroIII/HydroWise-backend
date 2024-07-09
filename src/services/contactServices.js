import { CONTACT, SORT_ORDER } from '../constants/constants.js';
import { Models } from '../db/models/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

const getAllContacts = async ({
  userId,
  page = 1,
  perPage = 3,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filterObj: filter = {},
}) => {
  const skip = (page - 1) * perPage;

  let contactsQuery = Models.ContactModel.find({ userId });

  if (filter.contactType) {
    contactsQuery = contactsQuery
      .where(CONTACT.CONTACT_TYPE)
      .equals(filter.contactType);
  }
  if (filter.isFavorite) {
    contactsQuery = contactsQuery
      .where(CONTACT.IS_FAVORITE)
      .equals(filter.isFavorite);
  }
  if (filter.name) {
    contactsQuery = contactsQuery.where(CONTACT.NAME, {
      $regex: new RegExp(filter.name, 'i'),
    });
  }
  if (filter.phoneNumber) {
    contactsQuery = contactsQuery.where(CONTACT.PHONE_NUMBER, {
      $regex: new RegExp(filter.phoneNumber, 'i'),
    });
  }
  if (filter.email) {
    contactsQuery = contactsQuery.where(CONTACT.EMAIL, {
      $regex: new RegExp(filter.email, 'i'),
    });
  }
  const [contacts, contactsCount] = await Promise.all([
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
    Models.ContactModel.countDocuments({ userId }).exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

const getContactById = async (payload) =>
  (await Models.ContactModel.findOne(payload)) || null;

const addNewContact = async (payload) =>
  await Models.ContactModel.create(payload);

const updateContact = async ({ contactId, userId }, payload, options = {}) =>
  await Models.ContactModel.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      ...options,
    },
  );

const deleteContact = async (id) =>
  await Models.ContactModel.findOneAndDelete(id);

export const contacts = {
  getAllContacts,
  getContactById,
  addNewContact,
  updateContact,
  deleteContact,
};
