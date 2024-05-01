from fastapi import FastAPI

class FAST_APP:
    def __init__(self):
        self.app = FastAPI()

    def get_app(self):
        return self.app