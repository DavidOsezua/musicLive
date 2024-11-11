from typing import BinaryIO
from src.config import settings
from PIL import Image
from PIL.Image import Image as ImageType
import pathlib, os
from src.schema import ImagePaths

upload_path = pathlib.Path(settings.UPLOAD_DIR)


def get_band_images_path(band_id: int):
    band_images_path = upload_path.joinpath(settings.BANDS_UPLOAD_DIR, str(band_id))
    files = os.listdir(band_images_path)
    images = [str(band_images_path.joinpath(i)) for i in files]
    return images


def get_venue_images_path(venue_id: int):
    band_images_path = upload_path.joinpath(settings.VENUE_UPLOAD_DIR, str(venue_id))
    files = os.listdir(band_images_path)
    images = [str(band_images_path.joinpath(i)) for i in files]
    return images


def save_image(image: ImageType, type_folder: str, resource_id: str, name: str):
    _format = image.format
    ext = _format.lower() if _format else "jpg"
    name = f"{name}.{ext}"
    upload_dir = upload_path.joinpath(type_folder, resource_id)
    os.makedirs(upload_dir, exist_ok=True)
    path = upload_dir.joinpath(name)
    image.save(path)
    return str(path)


def save_band_images(
    band_id: str,
    image1: BinaryIO,
    image2: BinaryIO,
):
    img1 = Image.open(image1)
    img2 = Image.open(image2)
    path_1 = save_image(img1, settings.BANDS_UPLOAD_DIR, band_id, "1")
    path_2 = save_image(img2, settings.BANDS_UPLOAD_DIR, band_id, "2")
    return ImagePaths(path1=path_1, path2=path_2)


def save_ads_images(
    add_id: str,
    image1: BinaryIO,
):
    img = Image.open(image1)
    path_1 = save_image(img, settings.ADS_UPLOAD_DIR, add_id, "1")
    return path_1


def save_images(
    id: str,
    image1: BinaryIO,
):
    img = Image.open(image1)
    path_1 = save_image(img, settings.ADS_UPLOAD_DIR, id, "1")
    return path_1


def save_venue_images(
    venue_id: str,
    image1: BinaryIO,
    image2: BinaryIO,
):
    img1 = Image.open(image1)
    img2 = Image.open(image2)
    path_1 = save_image(img1, settings.VENUE_UPLOAD_DIR, venue_id, "1")
    path_2 = save_image(img2, settings.VENUE_UPLOAD_DIR, venue_id, "2")
    return ImagePaths(path1=path_1, path2=path_2)
