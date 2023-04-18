import { Router } from "express";
import dayjs from "dayjs";

import { authGuard } from "../middlewares/authGuard";
import { transformResponse } from "../helpers/transformResponse";
import { LoadingPlan } from "../sequelize/models/LoadingPlan";

const router = Router();

router.get("/api/loading-plan/all", async (req, res) => {
	const loadingPlans = await LoadingPlan.findAll();
	res.send(transformResponse(loadingPlans));
});

router.get("/api/loading-plan/:id", async (req, res) => {
	const loadingPlan = await LoadingPlan.findOne({
		where: { id: Number(req.params.id) },
	});
	res.send(transformResponse(loadingPlan));
});

router.post("/api/loading-plan", async (req, res) => {
	let { name, expiresOn } = req.body || {};

	expiresOn = dayjs(expiresOn);
	name = (name as string).trim();

	const loadingPlan = await LoadingPlan.create({
		name,
		expiresOn: expiresOn.toDate(),
	} as any);
	res.send(transformResponse(loadingPlan));
});

router.put("/api/process-loading-plans", async (req, res) => {
	let { whenLessDays = 10 } = req.body || {};
	whenLessDays = Number(whenLessDays);

	const currentDate = dayjs();
	const loadingPlans = await LoadingPlan.findAll({ where: { processed: false } });
	const needProcessedLoadingPlans = loadingPlans.filter(
		(loadingPlan) => dayjs(loadingPlan.expiresOn).diff(currentDate, "days") <= whenLessDays
	);

	for (const loadingPlan of needProcessedLoadingPlans) {
		await loadingPlan.update({ processed: true });
	}

	res.send(transformResponse(needProcessedLoadingPlans));
});

router.delete("/api/loading-plan/:id", async (req, res) => {
	const loadingPlan = await LoadingPlan.destroy({ where: { id: Number(req.params.id) } });
	res.send(transformResponse(loadingPlan));
});

export default router;
