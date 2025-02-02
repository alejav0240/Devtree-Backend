import { Request, Response } from "express";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";
import { v4 as uuid } from "uuid";
import cloudinary from "../config/cloudinary";
import formidable from "formidable";
import User from "../models/User";
import slug from "slug";

export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    const error = new Error("Email ya esta registrado");
    res.status(409).json({ error: error.message });
    return;
  }

  const handle = slug(req.body.handle, "");
  const handleExists = await User.findOne({ handle });
  if (handleExists) {
    const error = new Error("Nombre de usuario ya esta registrado");
    res.status(409).json({ error: error.message });
    return;
  }

  const user = new User(req.body);

  user.password = await hashPassword(password);
  user.handle = handle;

  await user.save();

  res.status(201).send("Usuario registrado");
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Usuario no encontrado");
    res.status(404).json({ error: error.message });
    return;
  }

  //comprobar el pasword
  const isPasswordCorrecy = await checkPassword(password, user.password);
  if (!isPasswordCorrecy) {
    const error = new Error("Password incorrecto");
    res.status(401).json({ error: error.message });
    return;
  }

  //generar el token
  const token = generateJWT({ id: user.id });
  res.status(200).send(token);
};

export const getUSer = async (req: Request, res: Response) => {
  res.status(200).json(req.user);
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description, links } = req.body;

    const handle = slug(req.body.handle, "");
    const handleExists = await User.findOne({ handle });

    if (handleExists && handleExists.id !== req.user.id) {
      const error = new Error("Nombre de usuario ya esta registrado");
      res.status(409).json({ error: error.message });
      return;
    }

    req.user.description = description;
    req.user.handle = handle;
    req.user.links = links;

    await req.user.save();

    res.status(200).send("Perfil actualizado");
  } catch (e) {
    const error = new Error("Error al actualizar el perfil");
    res.status(500).json({ error: error.message });
  }
};

export const uploadImage = async (req: Request, res: Response) => {
  const form = formidable({ multiples: false });
  try {
    form.parse(req, (error, fields, files) => {
      cloudinary.uploader.upload(
        files.file[0].filepath,
        { public_id: uuid() },
        async function (error, result) {
          if (error) {
            const error = new Error("Error al subir la imagen");
            res.status(500).json({ error: error.message });
            return;
          }
          if (result) {
            req.user.image = result.secure_url;
            await req.user.save();
            res.status(200).json({ image: req.user.image });
          }
        }
      );
    });
  } catch (e) {
    const error = new Error("Error al actualizar el perfil");
    res.status(500).json({ error: error.message });
  }
};

export const getUserByHandle = async (req: Request, res: Response) => {
  try {
    const { handle } = req.params;
    const user = await User.findOne({ handle }).select(
      "-_id -__v -email -password"
    );
    if (!user) {
      const error = new Error("Nombre de Usuario no encontrado");
      res.status(404).json({ error: error.message });
      return;
    }
    res.json(user);
  } catch (e) {
    const error = new Error("Error al actualizar el perfil");
    res.status(500).json({ error: error.message });
  }
};

export const searchByHandle = async (req: Request, res: Response) => {
  try {
    const { handle } = req.body;
    const userExists = await User.findOne({ handle });
    if (userExists) {
      const error = new Error(`${handle} ya esta registrado`);
      res.status(409).json({ error: error.message });
      return;
    }
    res.send(`${handle} esta disponible`);
  } catch (e) {
    const error = new Error("Error al buscar el usuario");
    res.status(500).json({ error: error.message });
  }
};
