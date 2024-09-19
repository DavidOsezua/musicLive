from fastapi import FastAPI
from contextlib import asynccontextmanager
from db.database import init_db
from route.api import api_router
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app:FastAPI):
    print("server is running at port 8000")
    await init_db()
    print("database started successfully")
    yield
    print("the system has close automatically")
    # await close_db()
    


app = FastAPI(lifespan=lifespan)
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)