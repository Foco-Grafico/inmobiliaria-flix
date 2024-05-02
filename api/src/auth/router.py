from fastapi import APIRouter
from api.src.auth.controllers import login, register, get_user, is_logged

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

router.post("/register")(register.register_user)
router.post("/login")(login.login_user)
router.get("/user")(get_user.get_user)
router.get("/is-logged")(is_logged.is_logged)