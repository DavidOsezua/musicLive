from sqlmodel import SQLModel, Field, Column, Integer, String, Relationship, ForeignKey
from uuid import UUID, uuid4
from sqlalchemy.dialects.mysql import CHAR
import shortuuid
from datetime import datetime
from typing import Optional
from pydantic import EmailStr
from datetime import datetime, date, time
from time import time as tm


def get_current_timestamp():
    return int(tm())


class Ads(SQLModel, table=True):
    __tablename__ = "Ads"
    id: str = Field(default=None, primary_key=True)
    image: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    is_admin_approved: bool = Field(default=False)

    def __repr__(self) -> str:
        return f"Ads: images table created successfully!"


class Band(SQLModel, table=True):
    __tablename__ = "Band"
    id: str = Field(default=None, primary_key=True)
    email: EmailStr = Field(sa_column=Column(String(255), unique=False))
    name: str = Field(sa_column=Column(String(100)))
    genre_type: str = Field(sa_column=Column(String(100)))
    band_tag: str = Field(sa_column=Column(String(150)))
    email: str = Field(sa_column=Column(String(255), unique=True))
    homepage: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    facebook_url: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    instagram_url: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    youtube_url: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    image1: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    image2: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    is_verified: bool = Field(default=False)
    is_admin_approved: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    model_config = {"arbitrary_types_allowed": True}

    def __repr__(self) -> str:
        return f"Band: {self.name} created successfully!"


class Venue(SQLModel, table=True):
    __tablename__ = "Venue"
    id: str = Field(default=None, primary_key=True)
    name: str = Field(sa_column=Column(String(100)))
    venue_type: str = Field(sa_column=Column(String(100)))
    address: str
    email: str = Field(sa_column=Column(String(255), unique=False))
    homepage: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    facebook_url: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    instagram_url: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    youtube_url: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    image1: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    image2: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    is_verified: bool = Field(default=False)
    is_admin_approved: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    model_config = {"arbitrary_types_allowed": True}

    # def __repr__(self) -> str:
    #     return f"Venue: {self.name} created successfully!"


class Genre(SQLModel, table=True):
    __tablename__ = "Genre"
    id: str = Field(default=None, primary_key=True)
    name: str = Field(sa_column=Column(String(100)))
    image: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    is_admin_approved: bool = Field(default=False)
    created_at: int = Field(default_factory=get_current_timestamp)
    model_config = {"arbitrary_types_allowed": True}

    def __repr__(self) -> str:
        return f"Genre: {self.name} created successfully!"


class Venuetype(SQLModel, table=True):
    __tablename__ = "Venuetype"

    id: str = Field(default=None, primary_key=True)
    name: str = Field(sa_column=Column(String(100)))
    image: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    is_admin_approved: bool = Field(default=False)

    model_config = {"arbitrary_types_allowed": True}

    def __repr__(self) -> str:
        return f"Venuetype: {self.name} created successfully!"


class Event(SQLModel, table=True):
    __tablename__ = "events"

    id: str = Field(primary_key=True, default_factory=shortuuid.uuid)
    name: str = Field(nullable=False, unique=True)
    venue_id: str = Field(default=None, foreign_key="Venue.id", ondelete="CASCADE")
    band_id: str = Field(default=None, foreign_key="Band.id", ondelete="CASCADE")
    date: date
    time: time
    venue: "Venue" = Relationship(sa_relationship_kwargs={"uselist": False})
    band: "Band" = Relationship(sa_relationship_kwargs={"uselist": False})
    status: str = Field(default="approved")


class Subscriber(SQLModel, table=True):
    __tablename__ = "subscriber"

    email: str = Field(primary_key=True)
