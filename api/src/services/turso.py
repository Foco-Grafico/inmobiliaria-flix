import requests
from dotenv import load_dotenv
import os
load_dotenv()

class DB:
    def __init__(self):
        self.__url__ = os.getenv('TURSO_HTTP_URL')
        self.__token__ = os.getenv('TURSO_AUTH_TOKEN')

        print(self.__url__)

        self.type = None
        self.table_name = None
        self.select_params = []
        self.insert_params = {}
        self.update_params = {}
        self.where_params = {}
        self.upsert_params = {}

    def select(self, select_params: list[str] = []):
        self.select_params = select_params
        self.type = 'select' 
        
        return self
    
    def insert(self, insert_params: dict[str, str] = {}):
        self.insert_params = insert_params
        self.type = 'insert'

        return self
    
    def update(self, update_params: dict[str, str] = {}):
        self.update_params = update_params
        self.type = 'update'

        return self
    
    def delete(self):
        self.type = 'delete'

        return self
    
    def upsert(self, upsert_params: dict[str, str] = {}):
        self.upsert_params = upsert_params
        self.type = 'upsert'

        return self
    
    def from_table(self, table_name: str):
        self.table_name = table_name

        return self
    
    def where(self, where_params: dict[str, str | int | float | bool] = {}):
        self.where_params = where_params

        return self

    def execute(self):
        if not self.__url__:
            raise ValueError('TURSO_DATABASE_URL not found in .env')
        
        if not self.__token__:
            raise ValueError('TURSO_AUTH_TOKEN not found in .env')
        
        query = self.__construct_query__()

        if not query:
            raise ValueError('Invalid query')
        
        response = requests.post(
            url=self.__url__,
            headers={
                'Authorization': f'Bearer {self.__token__}',
                'Content-Type': 'application/json'
            },
            json={
                'requests': [
                    { 'type': "execute", 'stmt': { 'sql': query } },
                    { 'type': "close" }
                ]
            }
        )

        if response.status_code != 200:
            raise ValueError('Invalid response from Turso')
        
        json = response.json()

        schema = json['results'][0]['response']['result']['cols']
        data = json['results'][0]['response']['result']['rows']

        return data, schema


    def __construct_query__(self):
        query = None

        if self.type == 'select':
            query = f'SELECT {", ".join(self.select_params) if len(self.select_params) > 0 else "*"} FROM {self.table_name}'
            if self.where_params:
                query += f' WHERE {", ".join([f"{key} = {value}" for key, value in self.where_params.items()])}'
            
        elif self.type == 'insert':
            query = f'INSERT INTO {self.table_name} ({", ".join(self.insert_params.keys())}) VALUES ({", ".join(self.insert_params.values())})'
        elif self.type == 'update':
            query = f'UPDATE {self.table_name} SET {", ".join([f"{key} = {value}" for key, value in self.update_params.items()])}'
            if self.where_params:
                query += f' WHERE {", ".join([f"{key} = {value}" for key, value in self.where_params.items()])}'
        elif self.type == 'delete':
            query = f'DELETE FROM {self.table_name}'
            if self.where_params:
                query += f' WHERE {", ".join([f"{key} = {value}" for key, value in self.where_params.items()])}'
        elif self.type == 'upsert':
            query = f'INSERT INTO {self.table_name} ({", ".join(self.upsert_params.keys())}) VALUES ({", ".join(self.upsert_params.values())}) ON DUPLICATE KEY UPDATE {", ".join([f"{key} = {value}" for key, value in self.upsert_params.items()])}'

        return query
