def safe_int(value):
    """
    Safely convert a value to an integer.

    Args:
        value: Value to convert.

    Returns:
        int | None

    Raises:
        ValueError: If the value cannot be converted to an integer.
    """

    if value is None or value == "":
        return None

    if isinstance(value, int):
        return value

    try:
        return int(value)
    except (TypeError, ValueError):
        raise ValueError(f"Invalid integer value: {value}")