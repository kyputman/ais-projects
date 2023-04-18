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
const dayjs_1 = __importDefault(require("dayjs"));
const transformResponse_1 = require("../helpers/transformResponse");
const LoadingPlan_1 = require("../sequelize/models/LoadingPlan");
const router = (0, express_1.Router)();
router.get("/api/loading-plan/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loadingPlans = yield LoadingPlan_1.LoadingPlan.findAll();
    res.send((0, transformResponse_1.transformResponse)(loadingPlans));
}));
router.get("/api/loading-plan/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loadingPlan = yield LoadingPlan_1.LoadingPlan.findOne({
        where: { id: Number(req.params.id) },
    });
    res.send((0, transformResponse_1.transformResponse)(loadingPlan));
}));
router.post("/api/loading-plan", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, expiresOn } = req.body || {};
    expiresOn = (0, dayjs_1.default)(expiresOn);
    name = name.trim();
    const loadingPlan = yield LoadingPlan_1.LoadingPlan.create({
        name,
        expiresOn: expiresOn.toDate(),
    });
    res.send((0, transformResponse_1.transformResponse)(loadingPlan));
}));
router.put("/api/process-loading-plans", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { whenLessDays = 10 } = req.body || {};
    whenLessDays = Number(whenLessDays);
    const currentDate = (0, dayjs_1.default)();
    const loadingPlans = yield LoadingPlan_1.LoadingPlan.findAll({ where: { processed: false } });
    const needProcessedLoadingPlans = loadingPlans.filter((loadingPlan) => (0, dayjs_1.default)(loadingPlan.expiresOn).diff(currentDate, "days") <= whenLessDays);
    for (const loadingPlan of needProcessedLoadingPlans) {
        yield loadingPlan.update({ processed: true });
    }
    res.send((0, transformResponse_1.transformResponse)(needProcessedLoadingPlans));
}));
router.delete("/api/loading-plan/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loadingPlan = yield LoadingPlan_1.LoadingPlan.destroy({ where: { id: Number(req.params.id) } });
    res.send((0, transformResponse_1.transformResponse)(loadingPlan));
}));
exports.default = router;
