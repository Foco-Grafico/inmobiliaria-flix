from api.src.core.app import FAST_APP

fast_app = FAST_APP(
    routers=[]
)

app = fast_app.get_app()

@app.get("/")
async def root():
    return {"message": "Hello world"}

