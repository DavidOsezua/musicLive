from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from sqlalchemy import func
from db.table import Venue, Event, Band
import datetime


async def search_venue(
    name: str | None,
    types: list[str] | None,
    date: datetime.date | None,
    genre_type: str | None,
    session: AsyncSession,
):
    query = select(Venue).distinct()

    if types:
        print("filtering")
        types_ = [typ.lower() for typ in types]
        query = query.where(
            func.lower(Venue.venue_type).in_(types_),
        )
    if name:
        query = query.where(func.lower(Venue.name).contains(name))

    if date:
        query = query.join(Event, Event.venue_id == Venue.id).where(Event.date == date)
    if genre_type:
        query = (
            query.join(Event, Event.venue_id == Venue.id)
            .join(Band, Band.id == Event.band_id)
            .where(func.lower(Band.genre_type) == genre_type.lower())
        )
    result = await session.exec(query)
    venues = result.fetchall()
    return venues


async def search_band(
    name: str | None,
    genre_type: str | None,
    session: AsyncSession,
):
    query = select(Band).distinct().where(Band.is_admin_approved == True)
    if name:
        query = query.where(func.lower(Band.name).contains(name))

    if genre_type:
        query = query.where(func.lower(Band.genre_type) == genre_type.lower())

    result = await session.exec(query)
    bands = result.fetchall()
    return bands
