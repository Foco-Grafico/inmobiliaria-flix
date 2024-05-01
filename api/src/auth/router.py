from fastapi import APIRouter
from api.src.auth.controllers import login, register

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

router.post("/register")(register.register_user)
router.post("/login")(login.login_user)
