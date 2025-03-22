from funcker.plug.main import plug


def increment(i: int) -> int:
    return i + 1


plug(increment)
