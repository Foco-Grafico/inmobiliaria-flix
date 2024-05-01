from api.src.services.turso import DB
from pydantic import BaseModel
from api.src.utils.data import EXPIRATION_TIME_TOKEN_DAYS
from datetime import datetime, timedelta
from bcrypt import hashpw, gensalt
from fastapi import HTTPException, Depends
from uuid import uuid4 as v4

class RegisterUserRequest(BaseModel):
    email: str
    password: str
    first_name: str
    last_name: str
    phone_number: str

    @classmethod
    def as_form(
        cls,
        email: str,
        password: str,
        first_name: str,
        last_name: str,
        phone_number: str
    ):
        return cls(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number
    )

def timeplusdays(extra_days: int):
    now = datetime.now()

    return now + timedelta(days=extra_days)

async def register_user(request_user: RegisterUserRequest = Depends(RegisterUserRequest.as_form)):
    db = DB()

    token = hashpw(request_user.password.encode('utf-8'), gensalt()).decode('utf-8')

    try:
        db.insert({
            'id': str(v4()),
            'first_name': request_user.first_name,
            'last_name': request_user.last_name,
            'email': request_user.email, 
            'phone_number': request_user.phone_number,
            'token': token,
            'token_expiration_time': timeplusdays(EXPIRATION_TIME_TOKEN_DAYS)
        }).from_table('users').execute()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return {
        'message': 'User registered successfully',
        'token': token
    }
