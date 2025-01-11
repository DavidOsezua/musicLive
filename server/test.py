from src import uploads
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine
from src.config import settings
from src.search import search_venue
import asyncio
from db.table import Event
from src.email import send_venue_approval_msg, send_band_approval_msg

# send_band_approval_msg("ttech7633@gmail.com")
# send_venue_approval_msg("")
