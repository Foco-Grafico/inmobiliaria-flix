from src.core.app import FAST_APP
from dotenv import load_dotenv
load_dotenv()
from os import environ

app = FAST_APP().get_app()

@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)