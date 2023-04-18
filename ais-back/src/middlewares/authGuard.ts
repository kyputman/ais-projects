import { RequestHandler } from "express";
import { Login } from "../sequelize/models/Login";

export const authGuard: RequestHandler = async (req, res, next) => {
	if (!req.auth?.loginId) return res.sendStatus(401);
	const login = await Login.findOne({ where: { id: req.auth.loginId } });
	if (!login) return res.sendStatus(401);
	next();
};
