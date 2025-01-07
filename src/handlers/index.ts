import User from "../models/User";
import { Request, Response } from "express";
import { checkPassword, hashPassword } from "../utils/auth";
import slug from "slug";
import { validationResult } from "express-validator";

export const createAccount = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        const error = new Error("Usuario ya existe");
        res.status(409).json({ error: error.message });
        return;
    }

    const handle = slug(req.body.handle, '');
    const handleExists = await User.findOne({ handle });
    if (handleExists) {
        const error = new Error("Nombre de usuario ya existe");
        res.status(409).json({ error: error.message });
        return;
    }

    const user = new User(req.body);

    user.password = await hashPassword(password);
    user.handle = handle;

    await user.save();

    res.status(201).send("Usuario registrado");
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404).send("Usuario no encontrado");
        return;
    }

    //comprobar el pasword
    const isPasswordCorrecy = await checkPassword(password, user.password);
    if (!isPasswordCorrecy) {
        const error = new Error("Password incorrecto");
        res.status(401).json({ error: error.message });
        return;
    }

    res.status(200).send("Usuario logeado");

}