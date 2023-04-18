import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
	vus: 10, // Количество одновременных пользователей
	duration: "30s", // Продолжительность теста
};

export default function () {
	// Тестирование /api/vehicle/:id
	let vehicleId = Math.floor(Math.random() * 100) + 1; // Случайный ID для транспортного средства
	let res1 = http.get(`http://localhost:3000/api/vehicle/${vehicleId}`);
	check(res1, {
		"status is 200": (r) => r.status === 200,
		"response body is not empty": (r) => r.body.length > 0,
	});

	// Тестирование /api/vehicle/all
	let res2 = http.get("http://localhost:3000/api/vehicle/all");
	check(res2, {
		"status is 200": (r) => r.status === 200,
		"response body is not empty": (r) => r.body.length > 0,
	});

	sleep(1); // Пауза в 1 секунду между запросами
}
