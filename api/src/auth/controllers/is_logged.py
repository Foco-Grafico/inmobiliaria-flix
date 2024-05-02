from fastapi import Cookie, HTTPException
from typing import Annotated
from api.src.services.turso import DB

async def is_logged(token: Annotated[str | None, Cookie()] = None):
    if token is None:
        raise HTTPException(status_code=401, detail='Unauthorized')

    db = DB()

    try:
        db.select([
            'token'
        ]).from_table('users').where({
            'token': token
        }).single_execute()
    except:
        return False

    return True