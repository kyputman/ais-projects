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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = void 0;
const Login_1 = require("../sequelize/models/Login");
const authGuard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.auth) === null || _a === void 0 ? void 0 : _a.loginId))
        return res.sendStatus(401);
    const login = yield Login_1.Login.findOne({ where: { id: req.auth.loginId } });
    if (!login)
        return res.sendStatus(401);
    next();
});
exports.authGuard = authGuard;
