from src import uploads
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine
from src.config import settings
from src.search import search_venue
import asyncio


assert settings.DATABASE_URL

asyc_engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
)
# from db.database import get_session

# session = get_session()

name = "dun"


# session = asnyc_session()

# asyncio.run(search_venue(name, None, None, session))


# with

# images = uploads.get_venue_images_path(2)
# print(images)
# with open("musiclife.jpg", "rb") as f:
# data = f.read()
# uploads.save_venue_images(2, f, f)
