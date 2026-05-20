import express from 'express'
import { register ,login} from '../Controllers/user.js';

const router = express.Router();

// User register
// @api dsc :- User register
// @api method:-post
// @api endpoint:- /api/user/register

router.post('/register',register)

// User Login
// @api dsc :- User Login
// @api method:-post
// @api endpoint:- /api/user/login

router.post('/login',login)

export default router;

