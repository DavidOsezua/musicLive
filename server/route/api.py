from fastapi import File, Form, UploadFile, HTTPException, Depends, APIRouter, Query
from typing import Optional
from PIL import Image
import io
from pydantic import ValidationError
from sqlalchemy.exc import IntegrityError, OperationalError
from sqlmodel import select, update, MetaData, and_
from sqlalchemy.orm import selectinload
from db.database import get_session
from sqlmodel.ext.asyncio.session import AsyncSession
from src.schema import (
    Band_,
    Venue_,
    Contact,
    Ads_,
    Genre_,
    Type_,
    CreateEventSchema,
    EventsSchema,
    UpdateEvent,
    SubscriberSchema,
)
from src import uploads
from typing import List, Optional
from http import HTTPStatus
from src import exceptions
from db.table import Venue, Band, Ads, Genre, Venuetype, Event, Subscriber
from sqlalchemy import func
from datetime import timezone
from dateutil import parser
import yagmail
from db.database import asyc_engine
import shortuuid
from src import search
import datetime

api_router = APIRouter(prefix="/api/v1", tags=["api"])


@api_router.get("/tables_verified_lengths")
async def get_tables_verified_lengths(session: AsyncSession = Depends(get_session)):
    metadata = MetaData()
    async with asyc_engine.begin() as conn:
        await conn.run_sync(metadata.reflect)

    table_lengths = {}
    for table_name, table_obj in metadata.tables.items():
        total_count_query = select(func.count()).select_from(table_obj)
        total_count = await session.execute(total_count_query)
        table_lengths[table_name] = {"total": total_count.scalar()}

        if "is_admin_approved" in table_obj.c:
            admin_approved_query = (
                select(func.count())
                .select_from(table_obj)
                .where(table_obj.c.is_admin_approved == True)
            )
            admin_approved_count = await session.execute(admin_approved_query)
            table_lengths[table_name]["admin_approved"] = admin_approved_count.scalar()
        if "is_verified" in table_obj.c:
            verified_query = (
                select(func.count())
                .select_from(table_obj)
                .where(table_obj.c.is_verified == True)
            )
            verified_count = await session.execute(verified_query)
            table_lengths[table_name]["is_verified"] = verified_count.scalar()

    return {key: value for key, value in table_lengths.items()}


def validate_image_size(image: UploadFile, image_size: tuple):
    try:
        img = Image.open(io.BytesIO(image.file.read()))
        # if img.size != (400, 400):
        if img.size != image_size:
            raise exceptions.BadRequest(
                f"{image.filename} is not {image_size[0]}x{image_size[-1]} pixels"
            )
        image.file.seek(0)
    except Exception as e:
        raise exceptions.BadRequest(f"{str(e)}")


@api_router.get("/ads", response_model=List[Ads])
async def get_ads(session: AsyncSession = Depends(get_session)) -> List[Ads]:
    query = select(Ads)
    result = await session.exec(query)
    bands = result.fetchall()
    return [dict(row) for row in bands]


@api_router.get("/ads/admin_approved", response_model=List[Ads])
async def get_approved_ads(session: AsyncSession = Depends(get_session)) -> List[Ads]:
    query = select(Ads).where(Ads.is_admin_approved == True)
    result = await session.exec(query)
    bands = result.fetchall()
    return [dict(row) for row in bands]


@api_router.delete("/ads/{ads_id}", response_model=Ads)
async def delete_user_ads(ads_id: str, session: AsyncSession = Depends(get_session)):
    ads = await session.get(Ads, ads_id)
    if not ads:
        raise HTTPException(
            status_code=HTTPStatus.NO_CONTENT.value, detail="Ads not found"
        )
    await session.delete(ads)
    await session.commit()
    return ads


@api_router.put("/ads/approved/", response_model=List[Ads])
async def approve_ads(
    ads_id: str = Query(..., alias="venue_type"),
    Status: str = Query(..., alias="Status"),
    session: AsyncSession = Depends(get_session),
):
    status_normalized = Status.strip().lower()
    print(f"Incoming genre_type: {ads_id}")
    print(f"Incoming status: {Status}")
    query = select(Ads).where(Ads.id == ads_id)
    result = await session.exec(query)
    ads = result.fetchall()

    if not ads:
        raise HTTPException(status_code=404, detail="No ads found with this type")

    is_approved = status_normalized == "approved"
    update_query = (
        update(Ads).where(Ads.id == ads_id).values(is_admin_approved=is_approved)
    )

    await session.exec(update_query)
    await session.commit()

    updated_query = select(Ads)
    result = await session.exec(updated_query)
    updated_ads = result.fetchall()

    if not updated_ads:
        raise HTTPException(status_code=404, detail="Update failed")

    return updated_ads


@api_router.post("/ads")
async def upload__ads(
    image1: UploadFile = File(...), session: AsyncSession = Depends(get_session)
):
    try:
        # image_size = (400, 112)
        # validate_image_size(image1, image_size)
        ads_id = shortuuid.uuid()
        image_path = uploads.save_ads_images(ads_id, image1.file)
        try:
            ads_data = Ads(id=ads_id, image=image_path)
            session.add(ads_data)
            await session.commit()
            await session.refresh(ads_data)
            return ads_data

        except OperationalError as oe:
            await session.rollback()
            raise HTTPException(
                status_code=503, detail="Database is currently unreachable."
            )

        except ValidationError as ve:
            await session.rollback()
            raise HTTPException(
                status_code=400, detail="Validation error: Unprocessed identity."
            )

        except IntegrityError as ie:
            await session.rollback()
            raise HTTPException(
                status_code=400, detail="Database integrity error occurred."
            )

        except Exception as e:
            await session.rollback()
            raise HTTPException(
                status_code=400, detail=f"Unable to upload data: {str(e)}"
            )

    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")


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
    session: AsyncSession = Depends(get_session),
) -> Venue_:
    try:
        # image_size = (400, 400)
        venue_id = shortuuid.uuid()
        # validate_image_size(image1, image_size)
        # validate_image_size(image2, image_size)
        image_paths = uploads.save_venue_images(venue_id, image1.file, image2.file)

        venue_data = Venue_(
            name=name,
            venue_type=venue_type,
            address=address,
            email=email,
            homepage=homepage,
            facebook_url=facebook,
            instagram_url=instagram,
            youtube_url=youtube,
            image1=image_paths.path1,
            image2=image_paths.path2,
        )
        try:
            venue_db = Venue(id=venue_id, **venue_data.model_dump(by_alias=True))
            session.add(venue_db)
            await session.commit()
            await session.refresh(venue_db)
            return venue_data

        except IntegrityError as ie:
            if str("duplicate entry").lower() in str(ie.orig).lower():
                raise exceptions.BadRequest("Email already exists.")
            else:
                raise exceptions.BadRequest(
                    f"Integrity error occurred.Entry correct data and try again"
                )

        except OperationalError as oe:
            raise exceptions.BadRequest(
                f"Operational error occurred: database not reachable"
            )

        except ValidationError as ve:
            raise exceptions.BadRequest(f"Validation error: Unprocessed Identity")

        except Exception as e:
            raise exceptions.BadRequest(f"Unable to upload data: {str(e)}")

    except Exception as e:
        print(e)
        status_code = getattr(e, "status", 400)
        raise HTTPException(status_code=status_code, detail=f"{str(e)}")


@api_router.put("/venue/{venue_id}")
async def update_venue_id(
    venue_id: str,
    name: str = Form(...),
    venue_type: str = Form(...),
    address: str = Form(...),
    email: str = Form(...),
    homepage: Optional[str] = Form(None),
    facebook: Optional[str] = Form(None),
    instagram: Optional[str] = Form(None),
    youtube: Optional[str] = Form(None),
    image1: Optional[UploadFile] = File(None),
    image2: Optional[UploadFile] = File(None),
    session: AsyncSession = Depends(get_session),
) -> Venue_:
    try:
        existing_venue = await session.get(Venue, venue_id)
        if not existing_venue:
            raise HTTPException(status_code=404, detail="Venue not found")

        # image_size = (400, 400)
        venue_id = shortuuid.uuid()
        # validate_image_size(image1, image_size)
        # validate_image_size(image2, image_size)
        image_paths = uploads.save_venue_images(venue_id, image1.file, image2.file)

        existing_venue.name = name
        existing_venue.venue_type = venue_type
        existing_venue.address = address
        existing_venue.email = email
        existing_venue.homepage = homepage
        existing_venue.facebook_url = facebook
        existing_venue.instagram_url = instagram
        existing_venue.youtube_url = youtube
        existing_venue.image1 = image_paths.path1
        existing_venue.image2 = (image_paths.path2,)

        await session.commit()
        await session.refresh(existing_venue)

        return existing_venue

    except IntegrityError as ie:
        if str("duplicate entry").lower() in str(ie.orig).lower():
            raise HTTPException(status_code=400, detail="Email already exists.")
        else:
            raise HTTPException(
                status_code=400,
                detail="Integrity error occurred, correct data and try again.",
            )

    except OperationalError as oe:
        raise HTTPException(
            status_code=503, detail="Operational error occurred: database not reachable"
        )

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Unable to update data: {str(e)}")


@api_router.put("/band/{band_id}")
async def update_band_by_id(
    band_id: str,
    name: str = Form(...),
    genre_type: str = Form(...),
    band_tag: str = Form(...),
    email: str = Form(...),
    homepage: Optional[str] = Form(None),
    facebook: Optional[str] = Form(None),
    instagram: Optional[str] = Form(None),
    youtube: Optional[str] = Form(None),
    image1: Optional[UploadFile] = File(None),
    image2: Optional[UploadFile] = File(None),
    session: AsyncSession = Depends(get_session),
) -> Band_:
    try:
        existing_band = await session.get(Band, band_id)
        if not existing_band:
            raise HTTPException(status_code=404, detail="Band not found")
        # image_size = (400, 400)
        # validate_image_size(image1, image_size)
        # validate_image_size(image2, image_size)
        band_id = shortuuid.uuid()
        image_paths = uploads.save_band_images(band_id, image1.file, image2.file)

        existing_band.name = name
        existing_band.genre_type = genre_type
        existing_band.band_tag = band_tag
        existing_band.email = email
        existing_band.homepage = homepage
        existing_band.facebook_url = facebook
        existing_band.instagram_url = instagram
        existing_band.youtube_url = youtube
        existing_band.image1 = (image_paths.path1,)
        existing_band.image2 = (image_paths.path2,)

        await session.commit()
        await session.refresh(existing_band)

        return existing_band

    except IntegrityError as ie:
        print(ie)
        if str("duplicate entry").lower() in str(ie.orig).lower():
            raise HTTPException(status_code=400, detail="Email already exists.")
        else:
            raise HTTPException(
                status_code=400,
                detail="Integrity error occurred, correct data and try again.",
            )

    except OperationalError as oe:
        raise HTTPException(
            status_code=503, detail="Operational error occurred: database not reachable"
        )

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Unable to update data: {str(e)}")


@api_router.post("/band")
async def upload_band(
    name: str = Form(...),
    genre_type: str = Form(...),
    band_tag: str = Form(...),
    email: str = Form(...),
    homepage: Optional[str] = Form(None),
    facebook: Optional[str] = Form(None),
    instagram: Optional[str] = Form(None),
    youtube: Optional[str] = Form(None),
    image1: UploadFile = File(...),
    image2: UploadFile = File(...),
    session: AsyncSession = Depends(get_session),
) -> Band_:
    try:
        # image_size = (400, 400)
        # validate_image_size(image1, image_size)
        # validate_image_size(image2, image_size)
        band_id = shortuuid.uuid()
        image_paths = uploads.save_band_images(band_id, image1.file, image2.file)
        venue_data = Band_(
            name=name,
            genre_type=genre_type,
            band_tag=band_tag,
            email=email,
            homepage=homepage,
            facebook_url=facebook,
            instagram_url=instagram,
            youtube_url=youtube,
            image1=image_paths.path1,
            image2=image_paths.path2,
        )
        try:
            venue_db = Band(id=band_id, **venue_data.model_dump(by_alias=True))
            session.add(venue_db)
            await session.commit()
            await session.refresh(venue_db)
            return venue_data

        except IntegrityError as ie:
            print(ie)
            if str("duplicate entry").lower() in str(ie.orig).lower():
                raise exceptions.BadRequest("Email already exists.")
            else:
                raise exceptions.BadRequest(
                    f"Integrity error occurred.correct data and try again"
                )

        except OperationalError as oe:
            raise exceptions.BadRequest(
                f"Operational error occurred: database not reachable"
            )

        except ValidationError as ve:
            raise exceptions.BadRequest(f"Validation error: Unprocessed Identity")

        except Exception as e:
            raise exceptions.BadRequest(f"Unable to upload data: {str(e)}")

    except Exception as e:
        print(e)
        status_code = getattr(e, "status", 400)
        raise HTTPException(status_code=status_code, detail=f"{str(e)}")


@api_router.get("/band", response_model=List[Band])
async def get_band(session: AsyncSession = Depends(get_session)) -> Band:
    query = select(Band)
    result = await session.exec(query)
    bands = result.fetchall()
    
    return [dict(row) for row in bands]


@api_router.get("/venue", response_model=List[Venue])
async def get_venue(session: AsyncSession = Depends(get_session)) -> Venue:
    query = select(Venue)
    result = await session.exec(query)
    venues = result.fetchall()
    return [dict(row) for row in venues]


@api_router.delete("/venue/{venue_id}")
async def delete_user_venue(
    venue_id: str, session: AsyncSession = Depends(get_session)
):
    venue = await session.get(Venue, venue_id)
    if not venue:
        raise HTTPException(
            status_code=HTTPStatus.NO_CONTENT.value, detail="venue not found"
        )
    await session.delete(venue)
    await session.commit()
    return True


@api_router.delete("/band/{band_id}", response_model=Band)
async def delete_user_band(band_id: str, session: AsyncSession = Depends(get_session)):
    band = await session.get(Band, band_id)
    if not band:
        raise HTTPException(
            status_code=HTTPStatus.NO_CONTENT.value, detail="band not found"
        )
    await session.delete(band)
    await session.commit()
    return band


@api_router.put("/venue/", response_model=List[Venue])
async def update_venue(
    venue_id: str = Query(alias="ID"),
    Status: str = Query(alias="Status"),
    session: AsyncSession = Depends(get_session),
):
    query = select(Venue).where(Venue.id == venue_id)
    result = await session.exec(query)
    venue = result.fetchall()
    print(Status)

    if not venue:
        raise HTTPException(status_code=404, detail="Venue not found")
    if Status == "Approved":

        update_query = (
            update(Venue).where(Venue.id == venue_id).values(is_verified=True)
        )
        # else:
        #     update_query = (
        #         update(Venue).where(Venue.id == venue_id).values(is_verified=False)
        #     )

        await session.exec(update_query)
        await session.commit()
    updated_query = select(Venue).where(Venue.is_verified == True)
    result = await session.exec(updated_query)
    updated_venue = result.fetchall()

    if not updated_venue:
        raise HTTPException(status_code=404, detail="Update failed")

    return updated_venue


@api_router.put("/band/", response_model=List[Band])
async def update_band(
    band_id: str = Query(alias="ID"),
    Status: str = Query(alias="Status"),
    session: AsyncSession = Depends(get_session),
):

    query = select(Band).where(Band.id == band_id)
    result = await session.exec(query)
    venue = result.fetchall()
    if not venue:
        raise HTTPException(status_code=404, detail="Venue not found")

    new_status = Status == "Approved"
    print(new_status)
    update_query = (
        update(Band).where(Band.id == band_id).values(is_admin_approved=new_status)
    )

    await session.exec(update_query)
    await session.commit()

    updated_query = select(Band)
    result = await session.exec(updated_query)
    updated_venue = result.fetchall()

    # if not updated_venue:
    #     raise HTTPException(status_code=404, detail="Update failed")

    return updated_venue


@api_router.put("/venue/approved/", response_model=List[Venue])
async def approve_venue(
    # venue_type: str = Query(..., alias="venue_type"),
    venue_id: str = Query(..., alias="venue_type"),
    Status: str = Query(..., alias="Status"),
    session: AsyncSession = Depends(get_session),
):
    status_normalized = Status.strip().lower()
    venue_id = venue_id.strip()
    print(f"Incoming genre_type: {venue_id}")
    print(f"Incoming status: {Status}")
    query = select(Venue).where(func.lower(Venue.id) == venue_id.lower())
    print(f"Query: {query}")
    result = await session.exec(query)
    venues = result.fetchall()

    if not venues:
        raise HTTPException(status_code=404, detail="No venues found with this type")

    is_approved = status_normalized == "approved"
    update_query = (
        update(Venue)
        .where(func.lower(Venue.id) == venue_id.lower())
        .values(is_admin_approved=is_approved)
    )

    await session.exec(update_query)
    await session.commit()

    updated_query = select(Venue)
    result = await session.exec(updated_query)
    updated_venues = result.fetchall()

    if not updated_venues:
        raise HTTPException(status_code=404, detail="Update failed")

    return updated_venues


@api_router.put("/band/approved/", response_model=List[Band])
async def approve_band(
    genre_id: str = Query(..., alias="venue_type"),
    Status: str = Query(..., alias="Status"),
    session: AsyncSession = Depends(get_session),
):
    status_normalized = Status.strip().lower()
    genre_id = genre_id.strip()
    query = select(Band).where(Band.id == genre_id)
    result = await session.exec(query)
    bands = result.fetchall()

    if not bands:
        raise HTTPException(
            status_code=404, detail="No bands found with this genre type"
        )
    is_approved = status_normalized == "approved"

    update_query = (
        update(Band).where(Band.id == genre_id).values(is_admin_approved=is_approved)
    )
    await session.exec(update_query)
    await session.commit()
    updated_query = select(Band)
    result = await session.exec(updated_query)
    updated_bands = result.fetchall()

    if not updated_bands:
        raise HTTPException(
            status_code=404, detail="Update failed or no bands were updated"
        )

    return updated_bands


@api_router.post("/contact")
async def contact_us(
    contact_info: Contact, session: AsyncSession = Depends(get_session)
):
    try:
        print(contact_info)
        to_email = "your email to be sending the message"
        app_password = "You app password"
        yag = yagmail.SMTP(to_email, app_password)

        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Help Support For Music Live</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    color: #333;
                    background-color: #f4f4f4;
                    padding: 20px;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }}
                h1 {{
                    font-size: 20px;
                    color: #0066cc;
                    text-align: center;
                }}
                p {{
                    font-size: 16px;
                    line-height: 1.6;
                }}
                .info {{
                    margin-top: 20px;
                    padding: 10px;
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }}
                .info strong {{
                    color: #333;
                }}
                .footer {{
                    text-align: center;
                    font-size: 12px;
                    color: #aaa;
                    margin-top: 30px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Help Support Request</h1>
                <p>You have received a new support request for Music Live from:</p>
                <div class="info">
                    <p><strong>Name:</strong> {contact_info.name.capitalize()}</p>
                    <p><strong>Email:</strong> {contact_info.email}</p>
                    <p><strong>Phone Number:</strong> {contact_info.phone}</p>
                </div>
                <p><strong>Message:</strong></p>
                <p>{contact_info.description}</p>
                <p>Thank you for your attention!</p>
                <p class="footer">This is an automated message. Please do not reply.</p>
            </div>
        </body>
        </html>
        """
        yag.send(
            "email to receive the message", "Help Support For Music Live", html_content
        )

        return {"status": 200, "message": "Email sent successfully"}

    except Exception as e:
        print(e)
        status_code = getattr(e, "status", 400)
        raise HTTPException(
            status_code=status_code,
            detail=f"Your email was not delivered due to a technical error,Please retry in a few moments.",
        )


@api_router.get("/band/approved", response_model=List[Band])
async def get_band_approved(session: AsyncSession = Depends(get_session)) -> Band:
    # query = select(Band)
    query = select(Band).where(Band.is_admin_approved == True)
    result = await session.exec(query)
    bands = result.fetchall()
    return [dict(row) for row in bands]


@api_router.get("/venue/approved", response_model=List[Venue])
async def get_venue_approved(session: AsyncSession = Depends(get_session)) -> Venue:
    query = select(Venue).where(Venue.is_verified == True)
    result = await session.exec(query)
    venues = result.fetchall()
    return [dict(row) for row in venues]


@api_router.get("/venue/search", response_model=List[Venue])
async def search_venue(
    name: str | None = Query(default=None),
    types: str | None = Query(default=None),
    date: datetime.date | None = Query(default=None),
    genre_type: str | None = Query(default=None),
    session: AsyncSession = Depends(get_session),
):
    types_ = types.split(",") if types else None
    venues = await search.search_venue(name, types_, date, genre_type, session)
    return venues


@api_router.get("/band/search", response_model=List[Band])
async def search_band(
    name: Optional[str] = Query(default=None),
    # band_tag: Optional[str] = Query(default=None),
    genre_type: Optional[str] = Query(default=None),
    session: AsyncSession = Depends(get_session),
):
    # query = select(Band).where(Band.is_admin_approved == True)
    # if name and genre_type:
    #     name = name.strip().lower()
    #     genre_type = genre_type.strip().lower()
    #     query = query.where(
    #         func.lower(Band.genre_type) == genre_type,
    #         func.lower(Band.name).contains(name),
    #     )

    # elif name:
    #     name = name.strip().lower()
    #     query = query.where(func.lower(Band.name).contains(name))

    # elif genre_type:
    #     genre_type = genre_type.strip().lower()
    #     query = query.where(func.lower(Band.genre_type) == genre_type)

    # if not (name or genre_type):
    #     return []

    # result = await session.exec(query)
    # band = result.fetchall()
    # if not band:
    #     return []
    band = await search.search_band(name, genre_type, session)
    return band


@api_router.post("/genre/")
async def create_genre(
    name: str = Form(...),
    image: UploadFile = File(...),
    session: AsyncSession = Depends(get_session),
):
    try:
        image_size = (64, 64)
        validate_image_size(image, image_size)
        genre_id = shortuuid.uuid()
        image_path = uploads.save_images(genre_id, image.file)

        try:
            genre_data = Genre_(name=name, image=image_path)
            try:
                genre_data = Genre(id=genre_id, **genre_data.model_dump(by_alias=True))
                session.add(genre_data)
                await session.commit()
                await session.refresh(genre_data)
                return genre_data

            except OperationalError as oe:
                await session.rollback()
                raise HTTPException(
                    status_code=503, detail="Database is currently unreachable."
                )

            except ValidationError as ve:
                await session.rollback()
                raise HTTPException(
                    status_code=400, detail="Validation error: Unprocessed identity."
                )

            except IntegrityError as ie:
                await session.rollback()
                raise HTTPException(
                    status_code=400, detail="Database integrity error occurred."
                )

            except Exception as e:
                await session.rollback()
                raise HTTPException(
                    status_code=400, detail=f"Unable to upload data: {str(e)}"
                )

        except Exception as e:
            print(e)
            raise HTTPException(status_code=400, detail=f"Error: {str(e)}")

    except Exception as e:
        print(e)
        status_code = getattr(e, "status", 400)
        raise HTTPException(status_code=status_code, detail=f"{str(e)}")


@api_router.post("/type/")
async def create_venue_type(
    name: str = Form(...),
    image: UploadFile = File(...),
    session: AsyncSession = Depends(get_session),
):
    try:
        image_size = (64, 64)
        validate_image_size(image, image_size)
        genre_id = shortuuid.uuid()
        image_path = uploads.save_images(genre_id, image.file)

        try:
            type_data = Type_(name=name, image=image_path)
            try:
                type_data = Venuetype(
                    id=genre_id, **type_data.model_dump(by_alias=True)
                )
                session.add(type_data)
                await session.commit()
                await session.refresh(type_data)
                return type_data

            except OperationalError as oe:
                await session.rollback()
                raise HTTPException(
                    status_code=503, detail="Database is currently unreachable."
                )

            except ValidationError as ve:
                await session.rollback()
                raise HTTPException(
                    status_code=400, detail="Validation error: Unprocessed identity."
                )

            except IntegrityError as ie:
                await session.rollback()
                raise HTTPException(
                    status_code=400, detail="Database integrity error occurred."
                )

            except Exception as e:
                await session.rollback()
                raise HTTPException(
                    status_code=400, detail=f"Unable to upload data: {str(e)}"
                )

        except Exception as e:
            print(e)
            raise HTTPException(status_code=400, detail=f"Error: {str(e)}")

    except Exception as e:
        status_code = getattr(e, "status", 400)
        raise HTTPException(status_code=status_code, detail=f"{str(e)}")


@api_router.get("/genre", response_model=List[Genre])
async def get_genres(session: AsyncSession = Depends(get_session)) -> Genre:
    query = select(Genre)
    result = await session.exec(query)
    genres = result.fetchall()
    return [dict(row) for row in genres]


@api_router.get("/type", response_model=List[Venuetype])
async def get_venue_type(session: AsyncSession = Depends(get_session)) -> Venuetype:
    query = select(Venuetype)
    result = await session.exec(query)
    venue_types = result.fetchall()
    return [dict(row) for row in venue_types]


@api_router.put("/genre/approved/", response_model=List[Genre])
async def approve_genre(
    genre_id: str = Query(..., alias="venue_type"),
    Status: str = Query(..., alias="Status"),
    session: AsyncSession = Depends(get_session),
):
    status_normalized = Status.strip().lower()
    genre_id = genre_id.strip()
    query = select(Genre).where(Genre.id == genre_id)
    result = await session.exec(query)
    genre = result.fetchall()

    if not genre:
        raise HTTPException(
            status_code=404, detail="No genre found with this genre type"
        )
    is_approved = status_normalized == "approved"

    update_query = (
        update(Genre).where(Genre.id == genre_id).values(is_admin_approved=is_approved)
    )
    await session.exec(update_query)
    await session.commit()
    updated_query = select(Genre)
    result = await session.exec(updated_query)
    updated_genre = result.fetchall()

    if not updated_genre:
        raise HTTPException(
            status_code=404, detail="Update failed or no genre were updated"
        )

    return updated_genre


@api_router.put("/type/approved/", response_model=List[Venuetype])
async def venue_type(
    type_id: str = Query(..., alias="venue_type"),
    Status: str = Query(..., alias="Status"),
    session: AsyncSession = Depends(get_session),
):
    status_normalized = Status.strip().lower()
    type_id = type_id.strip()
    query = select(Venuetype).where(Venuetype.id == type_id)
    result = await session.exec(query)
    type_band = result.fetchall()

    if not type_band:
        raise HTTPException(
            status_code=404, detail="No type found with this genre type"
        )
    is_approved = status_normalized == "approved"

    update_query = (
        update(Venuetype)
        .where(Venuetype.id == type_id)
        .values(is_admin_approved=is_approved)
    )
    await session.exec(update_query)
    await session.commit()
    updated_query = select(Venuetype)
    result = await session.exec(updated_query)
    updated_type = result.fetchall()

    if not updated_type:
        raise HTTPException(
            status_code=404, detail="Update failed or no type were updated"
        )

    return updated_type


@api_router.delete("/genre/{genre_id}", response_model=Genre)
async def delete_user_genre(
    genre_id: str, session: AsyncSession = Depends(get_session)
):
    genre = await session.get(Genre, genre_id)
    if not genre:
        raise HTTPException(
            status_code=HTTPStatus.NO_CONTENT.value, detail="genre not found"
        )
    await session.delete(genre)
    await session.commit()
    return genre


@api_router.delete("/type/{type_id}", response_model=Venuetype)
async def delete_user_type(type_id: str, session: AsyncSession = Depends(get_session)):
    type_ = await session.get(Venuetype, type_id)
    if not type_:
        raise HTTPException(
            status_code=HTTPStatus.NO_CONTENT.value, detail="type not found"
        )
    await session.delete(type_)
    await session.commit()
    return type_


@api_router.post("/events")
async def create_event(
    event: CreateEventSchema,
    session: AsyncSession = Depends(get_session),
):

    try:

        new_event = Event(
            name=event.name,
            venue_id=event.venue_id,
            band_id=event.band_id,
            date=event.date,
            time=event.time,
        )
        session.add(new_event)
        await session.commit()
        await session.refresh(new_event)
        return new_event

    except IntegrityError as ie:
        error_message = str(ie.orig)
        column_name = None
        if ie.orig.args[0] == 1062:
            raise HTTPException(
                status_code=400, detail="No venue with the given venue id"
            )
        if "FOREIGN KEY" in error_message:

            try:
                column_name = error_message.split("FOREIGN KEY (`")[1].split("`)")[0]
            except IndexError:
                column_name = "Unknown (parsing failed)"

        if column_name == "venue_id":
            raise HTTPException(
                status_code=400, detail="No venue with the given venue id"
            )
        elif column_name == "band_id":
            raise HTTPException(
                status_code=400, detail="No band with the given band id"
            )
        else:
            print(error_message[0])
            raise HTTPException(
                status_code=400, detail="Error creating event, please check your inputs"
            )
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error creating event")


@api_router.get("/events/all")
async def get_event(session: AsyncSession = Depends(get_session)):
    try:
        query = (
            select(Event)
            .options(selectinload(Event.band))
            .options(selectinload(Event.venue))
        )
        result = await session.exec(query)
        events = result.all()

        events_parsed = [
            EventsSchema.model_validate(
                {
                    **event.dict(),
                    "venue": event.venue.dict() if event.venue else None,
                    "band": event.band.dict() if event.band else None,
                }
            )
            for event in events
        ]
        return events_parsed
    except Exception as e:
        return []


@api_router.get("/events")
async def get_events(venue_id: str, session: AsyncSession = Depends(get_session)):
    try:
        query = (
            select(Event)
            .options(selectinload(Event.band))
            .options(selectinload(Event.venue))
            .where(Event.venue_id == venue_id)
        )
        result = await session.exec(query)
        events = result.all()

        events_parsed = [
            EventsSchema.model_validate(
                {
                    **event.dict(),
                    "venue": event.venue.dict() if event.venue else None,
                    "band": event.band.dict() if event.band else None,
                }
            )
            for event in events
        ]
        return events_parsed

    except Exception as e:
        print(e)
        return None

    pass


@api_router.delete("/events/{event_id}")
async def delete_event(event_id: str, session: AsyncSession = Depends(get_session)):
    type_ = await session.get(Event, event_id)
    if not type_:
        raise HTTPException(
            status_code=HTTPStatus.NO_CONTENT.value, detail="Event not found"
        )
    await session.delete(type_)
    await session.commit()
    return True


@api_router.put("/events/{event_id}")
async def update_event(
    event_id: str,
    update_info: UpdateEvent,
    session: AsyncSession = Depends(get_session),
):

    try:
        update_query = (
            update(Event)
            .where(Event.id == event_id)
            .values(update_info.model_dump(exclude_none=True, exclude_unset=True))
        )
        await session.exec(update_query)
        await session.commit()
        return True
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=400, detail="Unable to update event, check your inputs"
        )


@api_router.post("/subscribers")
async def add_subscriber(
    data: SubscriberSchema, session: AsyncSession = Depends(get_session)
):
    exists = await session.get(Subscriber, data.email)
    if exists:
        return True
    try:
        new_sub = Subscriber(email=data.email)
        session.add(new_sub)
        await session.commit()
        return True

    except Exception as e:
        return False


@api_router.get("/subscribers")
async def get_all_subscriber(session: AsyncSession = Depends(get_session)):
    query = select(Subscriber)
    result = await session.exec(query)
    events = result.fetchall()
    return events
