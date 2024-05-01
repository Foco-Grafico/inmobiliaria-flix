from api.src.core.app import FAST_APP
from dotenv import load_dotenv
load_dotenv()

fast_app = FAST_APP()

app = fast_app.get_app()

@app.get("/")
async def root():
    return {"message": "Hello world"}

