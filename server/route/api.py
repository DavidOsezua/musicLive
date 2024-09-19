from fastapi import FastAPI, File, Form, UploadFile, HTTPException,Depends,APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
from PIL import Image
import io
from pydantic import ValidationError
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlmodel import select
from db.database import get_session
from sqlmodel.ext.asyncio.session import AsyncSession
from src.schema import Band_, Venue_
from typing import List,Optional,Union
from http import HTTPStatus
import os
from src import exceptions
from db.table import Venue,Band


api_router = APIRouter(
    prefix="/api/v1",
    tags=["api"]
)



def validate_image_size(image: UploadFile):
    try:
        img = Image.open(io.BytesIO(image.file.read()))
        if img.size != (400, 400):
            raise exceptions.BadRequest(f"{image.filename} is not 400x400 pixels")
        image.file.seek(0) 
    except Exception as e:
        raise exceptions.BadRequest(f"{str(e)}")




@api_router.post("/venue")
async def upload_venue(
    name: str = Form(...),
    venue_type: str = Form(...),
    address: str = Form(...),
    email: str = Form(...),
    homepage: Optional[str] = Form(None),
    facebook: Optional[str] = Form(None),
    instagram: Optional[str] = Form(None),
    youtube: Optional[str] = Form(None),
    image1: UploadFile = File(...),
    image2: UploadFile = File(...),
    session: AsyncSession = Depends(get_session)
)->Venue_:
    try:
        DIR = 'uploads/venue'
        file_path = os.path.join(os.path.dirname(__file__),DIR)
        os.makedirs(file_path, exist_ok=True)
        validate_image_size(image1)
        validate_image_size(image2)
        
        image1_path = os.path.join(file_path, image1.filename)
        image2_path = os.path.join(file_path, image2.filename)

        with open(image1_path, "wb") as f:
            f.write(await image1.read())
        
        with open(image2_path, "wb") as f:
            f.write(await image2.read())

        venue_data = Venue_(
            name=name,
            venue_type=venue_type,
            address=address,
            email=email,
            homepage=homepage,
            facebook_url=facebook,
            instagram_url=instagram,
            youtube_url=youtube,
            image1=image1_path,
            image2=image2_path
        )
        try:
            venue_db = Venue(**venue_data.model_dump(by_alias=True))
            session.add(venue_db)
            await session.commit()
            await session.refresh(venue_db)
            return venue_data
        
        except IntegrityError as ie:
            if str('duplicate entry').lower() in str(ie.orig).lower():
                raise exceptions.BadRequest("Email already exists.")
            else:
                raise exceptions.BadRequest(f"Integrity error occurred.Entry correct data and try again")
        
        except OperationalError as oe:
            raise exceptions.BadRequest(f"Operational error occurred: database not reachable")
        
        except ValidationError as ve:
            raise exceptions.BadRequest(f"Validation error: Unprocessed Identity")
        
        except Exception as e:
            raise exceptions.BadRequest(f"Unable to upload data: {str(e)}")

    except Exception as e:
        print(e)
        status_code = getattr(e, 'status', 400) 
        raise HTTPException(status_code=status_code, detail=f"{str(e)}")





@api_router.post("/band")
async def upload_band(
    name: str = Form(...),
    genre_type: str = Form(...),
    tag_line: str = Form(...),
    email: str = Form(...),
    homepage: Optional[str] = Form(None),
    facebook: Optional[str] = Form(None),
    instagram: Optional[str] = Form(None),
    youtube: Optional[str] = Form(None),
    image1: UploadFile = File(...),
    image2: UploadFile = File(...),
    session: AsyncSession = Depends(get_session)
)->Band_:
    try:
        DIR = 'uploads/bands'
        file_path = os.path.join(os.path.dirname(__file__),DIR)
        os.makedirs(file_path, exist_ok=True)
        validate_image_size(image1)
        validate_image_size(image2)
        
        image1_path = os.path.join(file_path, image1.filename)
        image2_path = os.path.join(file_path, image2.filename)

        with open(image1_path, "wb") as f:
            f.write(await image1.read())
        
        with open(image2_path, "wb") as f:
            f.write(await image2.read())

        venue_data = Band_(
            name=name,
            genre_type=genre_type,
            band_tag=tag_line,
            email=email,
            homepage=homepage,
            facebook_url=facebook,
            instagram_url=instagram,
            youtube_url=youtube,
            image1=image1_path,
            image2=image2_path
        )
        try:
            venue_db = Band(**venue_data.model_dump(by_alias=True))
            session.add(venue_db)
            await session.commit()
            await session.refresh(venue_db)
            return venue_data
        
        except IntegrityError as ie:
            print(ie)
            if str('duplicate entry').lower() in str(ie.orig).lower():
                raise exceptions.BadRequest("Email already exists.")
            else:
                raise exceptions.BadRequest(f"Integrity error occurred.correct data and try again")
        
        except OperationalError as oe:
            raise exceptions.BadRequest(f"Operational error occurred: database not reachable")
        
        except ValidationError as ve:
            raise exceptions.BadRequest(f"Validation error: Unprocessed Identity")
        
        except Exception as e:
            raise exceptions.BadRequest(f"Unable to upload data: {str(e)}")

    except Exception as e:
        print(e)
        status_code = getattr(e, 'status', 400) 
        raise HTTPException(status_code=status_code, detail=f"{str(e)}")
    
    
    
@api_router.get("/band",response_model=List[Band])
async def get_band(session: AsyncSession = Depends(get_session))->Band:
    query = select(Band)
    result = await session.exec(query)
    bands = result.fetchall()
    print(result)
    return [dict(row) for row in bands] 



@api_router.get("/venue",response_model=List[Venue])
async def get_venue(session: AsyncSession = Depends(get_session))->Venue:
    query = select(Venue)
    result = await session.exec(query)
    venues = result.fetchall()
    return [dict(row) for row in venues] 


@api_router.delete("/{user_id}", response_model=Venue)
async def delete_user_venue(user_id: int, session: AsyncSession = Depends(get_session)):
    venue = await session.get(Venue, user_id)
    if not venue:
        raise HTTPException(status_code=HTTPStatus.NO_CONTENT.value, detail="Book not found")
    await session.delete(venue)
    await session.commit()
    return venue



@api_router.delete("/{user_id}", response_model=Band)
async def delete_user_band(user_id: int, session: AsyncSession = Depends(get_session)):
    band = await session.get(Band, user_id)
    if not band:
        raise HTTPException(status_code=HTTPStatus.NO_CONTENT.value, detail="Book not found")
    await session.delete(band)
    await session.commit()
    return band


