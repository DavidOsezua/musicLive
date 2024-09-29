from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str | None
    API_KEY: str
    UPLOAD_DIR: str = "uploads"
    BANDS_UPLOAD_DIR: str = "bands"
    VENUE_UPLOAD_DIR: str = "venues"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
