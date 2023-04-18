"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const Vehicle_1 = require("../sequelize/models/Vehicle");
const sequelize_1 = require("../sequelize");
const args = (0, minimist_1.default)(process.argv);
(0, sequelize_1.connect)().then(() => {
    Vehicle_1.Vehicle.update({
        weight: args.weight,
        width: args.width,
        height: args.height,
        depth: args.depth,
    }, { where: { id: args.id } }).then(() => {
        console.log("updated");
    });
});
