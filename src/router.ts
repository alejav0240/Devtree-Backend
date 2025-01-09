import { Router } from "express";
import { createAccount, getUSer, login } from "./handlers";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware/validation";
import { authenticate } from "./middleware/auth";


const router = Router();

/* Autentificacion y registro */

router.post("/auth/register",
    body('handle')
        .notEmpty()
        .withMessage('El nombre de usuario es requerido'),

    body('name')
        .notEmpty()
        .withMessage('El nombre es requerido'),

    body('email')
        .isEmail()
        .withMessage('El email no es valido'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('El password es requerido minimo de 8 caracteres '),
    handleInputErrors,
    createAccount
)

router.post("/auth/login",
    body('email')
        .isEmail()
        .withMessage('El email no es valido'),
    body('password')
        .notEmpty()
        .withMessage('El password es requerido'),
    handleInputErrors,
    login
)

router.get("/user",authenticate,getUSer)

export default router;