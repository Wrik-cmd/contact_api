import express from 'express';
import { deleteContactById, getAllContact, getContactById, getContactByUserId, newContact, updateContactById } from '../Controllers/contact.js';
import { isAuthenticated } from '../Middlewares/Auth.js';

const router = express.Router();

// new contact
// @api dsc :- creating contact
// @api method:-post
// @api endpoint:- /api/contact/new
router.post('/new',isAuthenticated, newContact);

// get all contact
router.get('/', getAllContact);

// get contact by id
router.get('/:id',getContactById);

//update contact by id
router.put('/:id',isAuthenticated, updateContactById);

// delete contact by id
router.delete('/:id', isAuthenticated, deleteContactById);

// get user specific contact
router.get('/userid/:id',getContactByUserId)

export default router;


