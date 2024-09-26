from sqlmodel import SQLModel, Field,Column,Integer,String
from uuid import UUID, uuid4
from sqlalchemy.dialects.mysql import CHAR

from datetime import datetime
from typing import Optional
from pydantic import EmailStr
from datetime import datetime, date,time


class Band(SQLModel, table=True):
    __tablename__ = "Band"
    id: Optional[int] = Field(default=None, primary_key=True, sa_column_kwargs={"autoincrement": True})
    email: EmailStr = Field(sa_column=Column(String(255), unique=True))  
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
    
    model_config = {
        'arbitrary_types_allowed': True
    }

    def __repr__(self) -> str:
        return f"Band: {self.name} created successfully!"


class Venue(SQLModel, table=True):
    __tablename__ = "Venue"
    id: Optional[int] = Field(default=None, primary_key=True, sa_column_kwargs={"autoincrement": True})
    name: str = Field(sa_column=Column(String(100))) 
    venue_type: str = Field(sa_column=Column(String(100))) 
    address: str
    email: str = Field(sa_column=Column(String(255), unique=True))
    homepage: Optional[str] = Field(default=None, sa_column=Column(String(255))) 
    facebook_url: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    instagram_url: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    youtube_url: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    image1: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    image2: Optional[str] = Field(default=None, sa_column=Column(String(255)))
    is_verified: bool = Field(default=False)  
    is_admin_approved: bool = Field(default=False) 
    genre_type:str = Field(sa_column=Column(String(100)))
    venue_date:date
    venue_time:time
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    
    model_config = {
        'arbitrary_types_allowed': True
    }

    def __repr__(self) -> str:
        return f"Venue: {self.name} created successfully!"
