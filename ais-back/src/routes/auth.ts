import { Router } from "express";
import jwt from "jsonwebtoken";

import { transformResponse } from "../helpers/transformResponse";

import { Login } from "../sequelize/models/Login";

const router = Router();

router.post("/api/login", async (req, res) => {
	const { login, password } = req.body || {};
	const userLogin = await Login.findOne({ where: { login, password } });
	console.log(userLogin, { login, password });
	if (!userLogin) return res.sendStatus(403);
	res.send(
		transformResponse({ token: jwt.sign({ loginId: userLogin.id }, "backend", { expiresIn: "7d" }) })
	);
});

router.post("/api/signin", async (req, res) => {
	const { login, password, firstName, secondName, middleName } = req.body || {};
	const userLogin = await Login.create({
		login,
		password,
		user: {
			firstName,
			secondName,
			middleName,
		} as any,
	} as any);
	if (!userLogin) return res.sendStatus(500);
	res.send(transformResponse(userLogin));
});

export default router;
