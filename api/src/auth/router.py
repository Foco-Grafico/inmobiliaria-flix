from fastapi import APIRouter
from api.src.auth.controllers.register import register_user

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

router.post("/register")(register_user)
