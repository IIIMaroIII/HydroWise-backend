import { Router } from 'express';
import { validateMongoId } from '../../middlewares/validateMongoId.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { Controllers } from '../../controllers/index.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { JoiSchemas } from '../../validation/index.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { upload } from '../../middlewares/upload.js';

export const contactsRouter = Router();

contactsRouter.use('/:contactId', validateMongoId('contactId'));
contactsRouter.use(authenticate);

contactsRouter.get(
  '',
  ctrlWrapper(Controllers.contacts.getAllContactsController),
);

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(Controllers.contacts.getContactByIdController),
);

contactsRouter.post(
  '',
  upload.single('photo'),
  validateBody(JoiSchemas.contacts.newContactSchema),
  ctrlWrapper(Controllers.contacts.addNewContactController),
);

contactsRouter.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(JoiSchemas.contacts.patchSchema),
  ctrlWrapper(Controllers.contacts.updateContactController),
);

contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(Controllers.contacts.deleteContactController),
);
