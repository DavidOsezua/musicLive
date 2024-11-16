from pydantic import BaseModel, EmailStr, Field
from typing import Optional

# from datetime import datetime
import datetime


class Band_(BaseModel):
    name: str = Field(..., alias="name")
    email: EmailStr
    genre_type: str = Field(..., alias="genre_type")
    band_tag: str
    homepage: Optional[str] = Field(None, alias="homepage")
    facebook_url: Optional[str] = None
    instagram_url: Optional[str] = None
    youtube_url: Optional[str] = None
    image1: Optional[str] = None
    image2: Optional[str] = None


class Venue_(BaseModel):
    name: str = Field(..., alias="name")
    email: EmailStr
    genre_type: str
    venue_type: str = Field(..., alias="venue_type")
    address: str
    venue_time: datetime.time
    venue_date: datetime.date
    homepage: Optional[str] = Field(None, alias="homepage")
    facebook_url: Optional[str] = None
    instagram_url: Optional[str] = None
    youtube_url: Optional[str] = None
    image1: Optional[str] = None
    image2: Optional[str] = None

    class Config:
        populate_by_name = True


class Ads_(BaseModel):
    image: Optional[str] = None

    class Config:
        populate_by_name = True


class Contact(BaseModel):
    name: str = Field(..., alias="name")
    email: EmailStr
    phone: str = Field(..., alias="phone")
    description: str

    class Config:
        populate_by_name = True


class ImagePaths(BaseModel):
    path1: str
    path2: str


class Genre_(BaseModel):
    name: str
    image: Optional[str] = None


class Type_(BaseModel):
    name: str
    image: Optional[str] = None


class CreateEventSchema(BaseModel):
    name: str
    venue_id: str
    band_id: str
    date: datetime.date
    time: datetime.time


class EventsSchema(BaseModel):
    id: str
    name: str
    venue_id: str
    band_id: str
    date: datetime.date
    time: datetime.time
    status: str

    venue: Venue_
    band: Band_

    class Config:
        from_attributes = True
