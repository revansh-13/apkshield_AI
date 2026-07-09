"""
AI client.

Routes AI requests to the configured provider.
"""

from app.config.settings import settings

from app.core.AI.providers.mock import (
    generate_completion as mock_generate_completion,
)

# Future imports
# from app.core.AI.providers.openai import (
#     generate_completion as openai_generate_completion,
# )


def generate_completion(
    system_prompt: str,
    user_prompt: str,
) -> dict:
    """
    Generate an AI completion using the configured provider.
    """

    if settings.AI_PROVIDER == "mock":
        return mock_generate_completion(
            system_prompt,
            user_prompt,
        )

    # Future
    # if settings.AI_PROVIDER == "openai":
    #     return openai_generate_completion(
    #         system_prompt,
    #         user_prompt,
    #     )

    raise ValueError(
        f"Unsupported AI provider: {settings.AI_PROVIDER}"
    )