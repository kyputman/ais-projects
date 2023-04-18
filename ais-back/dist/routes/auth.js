"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const transformResponse_1 = require("../helpers/transformResponse");
const Login_1 = require("../sequelize/models/Login");
const router = (0, express_1.Router)();
router.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body || {};
    const userLogin = yield Login_1.Login.findOne({ where: { login, password } });
    console.log(userLogin, { login, password });
    if (!userLogin)
        return res.sendStatus(403);
    res.send((0, transformResponse_1.transformResponse)({ token: jsonwebtoken_1.default.sign({ loginId: userLogin.id }, "backend", { expiresIn: "7d" }) }));
}));
router.post("/api/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password, firstName, secondName, middleName } = req.body || {};
    const userLogin = yield Login_1.Login.create({
        login,
        password,
        user: {
            firstName,
            secondName,
            middleName,
        },
    });
    if (!userLogin)
        return res.sendStatus(500);
    res.send((0, transformResponse_1.transformResponse)(userLogin));
}));
exports.default = router;
