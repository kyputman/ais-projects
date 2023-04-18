"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const connect_busboy_1 = __importDefault(require("connect-busboy"));
const cors_1 = __importDefault(require("cors"));
const express_jwt_1 = require("express-jwt");
const auth_1 = __importDefault(require("./routes/auth"));
const loadingPlan_1 = __importDefault(require("./routes/loadingPlan"));
const sequelize_1 = require("./sequelize");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, connect_busboy_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, express_jwt_1.expressjwt)({ secret: "backend", algorithms: ["HS256"], credentialsRequired: false }));
(0, sequelize_1.connect)();
app.use(loadingPlan_1.default);
app.use(auth_1.default);
app.listen(port, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${port}`);
});
