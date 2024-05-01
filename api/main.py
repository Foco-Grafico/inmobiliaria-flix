from .src.core.app import FAST_APP
from dotenv import load_dotenv
load_dotenv()

app = FAST_APP().get_app()

@app.get("/")
async def root():
    return {"message": "Hello world"}

