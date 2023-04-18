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
const Cargo_1 = require("../sequelize/models/Cargo");
const router = (0, express_1.Router)();
router.get("/api/cargo/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cargos = yield Cargo_1.Cargo.findAll();
    console.log(cargos);
    res.send((0, transformResponse_1.transformResponse)(cargos));
}));
router.get("/api/cargo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cargo = yield Cargo_1.Cargo.findOne({ where: { id: Number(req.params.id) } });
    res.send((0, transformResponse_1.transformResponse)(cargo));
}));
router.post("/api/cargo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { width, height, depth, weight, loadingPlanId } = req.body || {};
    const cargo = yield Cargo_1.Cargo.create({ width, height, depth, weight, loadingPlanId });
    res.send((0, transformResponse_1.transformResponse)(cargo));
}));
router.delete("/api/cargo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cargo = yield Cargo_1.Cargo.destroy({ where: { id: Number(req.params.id) } });
    res.send((0, transformResponse_1.transformResponse)(cargo));
}));
exports.default = router;
