from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware


class FAST_APP:
    def __init__(
        self,
        routers: list[APIRouter] = []
    ):
        self.app = FastAPI()

        self.__load_routers__(routers)

    def __load_routers__(self, routers: list[APIRouter]):
        for router in routers:
            self.app.include_router(router)

    def __load_middleware__(self):
        self.app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    def get_app(self):
        return self.app