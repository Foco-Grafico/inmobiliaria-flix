from pydantic import BaseModel
from fastapi import HTTPException, Depends, Form
from api.src.services.turso import DB
from typing import Annotated
from bcrypt import checkpw

class LoginUserRequest(BaseModel):
    email: str | None = None
    phone_number: str | None = None
    password: str

    @classmethod
    def as_form(
        cls,
        password: Annotated[str, Form()],
        email: Annotated[str | None, Form()] = None,
        phone_number: Annotated[str | None, Form()] = None
    ):
        return cls(
            email=email,
            phone_number=phone_number,
            password=password
    )


async def login_user(request_user: LoginUserRequest = Depends(LoginUserRequest.as_form)):
    db = DB()

    try:
        user = db.select(['token']).from_table('users').where({
            'email': request_user.email
        }).or_where({
            'phone_number': request_user.phone_number
        }).single_execute()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    if not user:
        raise HTTPException(status_code=400, detail='User not found')
    
    if not checkpw(request_user.password.encode('utf-8'), user['token'].encode('utf-8')):
        raise HTTPException(status_code=400, detail='Invalid password')
    
    return {
        'message': 'User logged in successfully',
        'token': user['token']
    }