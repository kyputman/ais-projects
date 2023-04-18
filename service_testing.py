import json
import time
import random
import string
import json
from datetime import datetime
from locust import HttpUser, task, tag, between

#locust -f C:\Users\igors\Desktop\service_testing.py --host=http://localhost:3000 --tags get_all_task get_one_task post_task put_task

def randomword(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

class RESTServerUser(HttpUser):
    """ Класс, эмулирующий пользователя / клиента сервера """
    wait_time = between(1.0, 5.0)
    
    @tag("get_all_task")
    @task(20)
    def get_all_task(self):
    
        with self.client.get('/api/loading-plan/all',
                             catch_response=True,
                             name = '/api/loading-plan/all') as response:                  
                                if response.status_code == 200 or response.status_code == 204:
                                    response.success()
                                else:
                                    response.failure(f'Status code is {response.status_code}')



    @tag("get_one_task")
    @task(10)
    def get_one_task(self):
    
        test_id = random.randint(1,8)
        with self.client.get(f'/api/loading-plan/{test_id}',
                             catch_response=True,
                             name = '/api/loading-plan/{test_id}') as response:                           
                                if response.status_code == 200 or response.status_code == 204:
                                    response.success()
                                else:
                                    response.failure(f'Status code is {response.status_code}')

    @tag("post_task")
    @task(1)
    def post_task(self):
        
        nme = randomword(5)
        test_data = {
            "name" : nme,
            "expiresOn" : "2012-04-23T18:25:43.511Z"
        }
        test_id = random.randint(1,8)
        post_data = json.dumps(test_data)
        with self.client.post('/api/loading-plan',
                              catch_response=True,
                              name='/api/loading-plan',
                              data=post_data,
                              headers={'Content-Type': 'application/json'}) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f'Status code is {response.status_code}')



    @tag("put_task")
    @task(3)
    def put_task(self):

        nme = randomword(5)
        test_data = {
            "whenLessDays": random.randint(1,100)
        }
        test_id = random.randint(1,8)
        post_data = json.dumps(test_data)
        with self.client.put('/api/process-loading-plans',
                              catch_response=True,
                              name='/api/process-loading-plans',
                              data=post_data,
                              headers={'Content-Type': 'application/json'}) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f'Status code is {response.status_code}')


