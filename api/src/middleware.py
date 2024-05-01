from fastapi import Request, Response
from typing import Callable

async def middleware(
    request: Request,
    next: Callable[[], Response]
):
    return next()