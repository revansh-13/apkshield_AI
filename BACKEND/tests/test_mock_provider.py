from app.core.AI.providers.mock import generate_completion

response = generate_completion(
    system_prompt="test",
    user_prompt="test",
)

print(response)