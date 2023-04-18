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
const express_1 = require("express");
const transformResponse_1 = require("../helpers/transformResponse");
const Vehicle_1 = require("../sequelize/models/Vehicle");
const router = (0, express_1.Router)();
router.get("/api/vehicle/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicles = yield Vehicle_1.Vehicle.findAll();
    res.send((0, transformResponse_1.transformResponse)(vehicles));
}));
router.get("/api/vehicle/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = yield Vehicle_1.Vehicle.findOne({ where: { id: Number(req.params.id) } });
    res.send((0, transformResponse_1.transformResponse)(vehicle));
}));
router.put("/api/vehicle/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { weight, width, height, depth } = req.body || {};
    const vehicle = yield Vehicle_1.Vehicle.update({ weight, width, height, depth }, {
        where: { id: Number(req.params.id) },
    });
    res.send((0, transformResponse_1.transformResponse)(vehicle));
}));
router.post("/api/vehicle", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { weight, width, height, depth } = req.body || {};
    const vehicle = yield Vehicle_1.Vehicle.create({ weight, width, height, depth });
    res.send((0, transformResponse_1.transformResponse)(vehicle));
}));
router.delete("/api/vehicle/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = yield Vehicle_1.Vehicle.destroy({ where: { id: Number(req.params.id) } });
    res.send((0, transformResponse_1.transformResponse)(vehicle));
}));
router.get("/api/delete-vehicle-by-id/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vehicle = yield Vehicle_1.Vehicle.destroy({ where: { id: Number(req.params.id) } });
    res.send((0, transformResponse_1.transformResponse)(vehicle));
}));
exports.default = router;
