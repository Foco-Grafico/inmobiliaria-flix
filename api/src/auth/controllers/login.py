from pydantic import BaseModel
from fastapi import HTTPException, Depends, Form
from fastapi.responses import JSONResponse
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
    except:
        # Error has occurred when user is not found
        raise HTTPException(status_code=404, detail='User not found')
    
    if user is None:
        # User is not found
        raise HTTPException(status_code=404, detail='User not found')
    
    if not checkpw(request_user.password.encode('utf-8'), user['token'].encode('utf-8')):
        raise HTTPException(status_code=401, detail='Invalid password')
    
    response = JSONResponse(content={
        'message': 'User logged in successfully',
        'token': user['token']
    })

    response.set_cookie(key='token', value=user['token'])

    return response