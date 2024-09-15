from pydantic import BaseModel,EmailStr,Field,AliasChoices
from enum import Enum
from typing import Any, Annotated, Optional,Dict,List
from datetime import datetime
from fastapi import  UploadFile



class Band_(BaseModel):
    name: str = Field(..., alias="name")
    email:EmailStr
    genre_type:str  = Field(..., alias="genre_type")
    band_tag:str
    homepage: Optional[str] = Field(None, alias="homepage")
    facebook_url: Optional[str] = None
    instagram_url: Optional[str] = None
    youtube_url: Optional[str] = None
    image1: Optional[str] = None
    image2: Optional[str] = None

    
    
class Venue_(BaseModel):
    name: str = Field(..., alias="name")
    email: EmailStr
    venue_type: str = Field(..., alias="venue_type")
    address: str
    homepage: Optional[str] = Field(None, alias="homepage")
    facebook_url: Optional[str] = None
    instagram_url: Optional[str] = None
    youtube_url: Optional[str] = None
    image1: Optional[str] = None
    image2: Optional[str] = None

    class Config:
        allow_population_by_field_name = True