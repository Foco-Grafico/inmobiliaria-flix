from pydantic import BaseModel
from fastapi import HTTPException, Depends
from api.src.services.turso import DB

class LoginUserRequest(BaseModel):
    email: str | None = None
    phone_number: str | None = None
    password: str

    @classmethod
    def as_form(
        cls,
        password: str,
        email: str | None = None,
        phone_number: str | None = None
    ):
        return cls(
            email=email,
            phone_number=phone_number,
            password=password
    )


async def login_user(request_user: LoginUserRequest = Depends(LoginUserRequest.as_form)):
    db = DB()

    try:
        user = db.select(['token', 'first_name']).from_table('users').where({
            'email': request_user.email
        }).or_where({
            'phone_number': request_user.phone_number
        }).single().execute()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    if not user:
        raise HTTPException(status_code=400, detail='User not found')
    
    return {
        'message': 'User logged in successfully',
        'user': user
    }