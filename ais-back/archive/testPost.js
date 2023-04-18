import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10, // Количество одновременных пользователей
  duration: '30s', // Продолжительность теста
};

export default function() {
  // Тестирование POST-запроса /api/vehicle
  let payload = JSON.stringify({
    weight: 1000, // Вес транспортного средства в кг
    width: 2500, // Ширина транспортного средства в метрах
    height: 3000, // Высота транспортного средства в метрах
    depth: 10000 // Длина транспортного средства в метрах
  });
  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.post('http://localhost:3000/api/vehicle', payload, params);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response body is not empty': (r) => r.body.length > 0
  });
  
  sleep(1); // Пауза в 1 секунду между запросами
}
