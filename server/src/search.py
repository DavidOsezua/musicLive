from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from sqlalchemy import func
from db.table import Venue


async def search_venue(
    name: str | None,
    genre: str | None,
    types: list[str] | None,
    session: AsyncSession,
):
    query = select(Venue)
    print(types)
    if types:
        print("filtering")
        types_ = [typ.lower() for typ in types]
        query = query.where(
            func.lower(Venue.venue_type).in_(types_),
        )
    if genre:
        query = query.where(func.lower(Venue.genre_type) == genre.lower())
    if name:
        query = query.where(func.lower(Venue.name).contains(name))

    result = await session.exec(query)
    venues = result.fetchall()
    return venues
