import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { body } from 'express-validator';

const router = Router();

//register route..
router.post('/register',
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 2 }).withMessage('Password must be at least 6 characters long'),
    userController.createUserController
);

//login route..
router.post('/login',
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 2 }).withMessage('Please valid password'),
    userController.loginUserController
)

export default router;