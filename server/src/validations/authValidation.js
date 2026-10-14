import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password').isLength({ min: 5 }),
    body('fullName').isLength({ min: 3 })
];

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password').isLength({ min: 5 })
];