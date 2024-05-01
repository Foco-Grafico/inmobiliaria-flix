from api.src.core.app import FAST_APP
from api.src.services.turso import DB

fast_app = FAST_APP(
    routers=[]
)

app = fast_app.get_app()

@app.get("/")
async def root():
    db = DB()

    _, schema = db.select().from_table('users').execute()

    return {"message": schema}

