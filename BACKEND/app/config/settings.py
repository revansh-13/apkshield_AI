from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    AI_PROVIDER: str = "mock"

    OPENAI_API_KEY: str = ""

    OPENAI_MODEL: str = "gpt-5.5"

    SARVAM_API_KEY: str = ""

    class Config:
        env_file = ".env"


settings = Settings()