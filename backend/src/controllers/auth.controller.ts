import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { NotFound } from "http-errors";
import { JWT_SECRET } from "../config";
import { LoginSchemaType, SignupSchemaType } from "../schemas/user.schema";
import { AppDataSource } from "../dataSource";

export const signupHandler = async (
    req: Request<unknown, unknown, SignupSchemaType>,
    res: Response
) => {
    const userRepository = AppDataSource.getRepository(User);
    const userFound = await userRepository.findOneBy({email: req.body.email});

    if (userFound) return res.status(403).json([{message: "Email is in use"}]);

    const newUser = userRepository.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
    });

    await newUser.hashPassword();

    const savedUser = await userRepository.save(newUser);

    const token = jwt.sign(
        {
            _id: savedUser.id,
        },
        JWT_SECRET,
        {
            expiresIn: 60 * 60 * 24,
        }
    );

    return res.json({
        token
    });
};

export const loginHandler = async (
    req: Request<unknown, unknown, LoginSchemaType>,
    res: Response
) => {
    console.log(req.body)

    const userRepository = AppDataSource.getRepository(User);
    const userFound = await userRepository.findOneBy({email: req.body.email});
    if(!userFound) throw new NotFound("User not found");

    const validPassword = await userFound.comparePassword(req.body.password);
    if(!validPassword) throw new NotFound("Invalid Password");

    const token = jwt.sign(
        {
            _id: userFound.id,
        },
        JWT_SECRET,
        {
            expiresIn: 60 * 60 * 24
        }
    );

    return res.json({
        token,
    });
};

export const profileHandler = async (req: Request, res: Response) => {
    const userRepository = AppDataSource.getRepository(User);
    const userProfile = await userRepository.findOne({ where: {id: req.body.id}})
  };