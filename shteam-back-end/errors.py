from http import HTTPStatus
from setup import app


class ApiError(Exception):
    def __init__(self, error: str, status: HTTPStatus, *args: object) -> None:
        super().__init__(*args)
        self.error = error
        self.status = status


@app.errorhandler(ApiError)
def handle_exception(e: ApiError):
    return {
        'msg': e.error
    }, e.status


class UsernamePasswordMismatch(ApiError):
    def __init__(self, *args: object) -> None:
        super().__init__(
            'Username and password do not match, try again or we\'ll call the cops >:^(',
            HTTPStatus.BAD_REQUEST,
            *args
        )


class DevNamePasswordMismatch(ApiError):
    def __init__(self, *args: object) -> None:
        super().__init__(
            'Developer name and password do not match, try again or we\'ll call the cops >:^(',
            HTTPStatus.BAD_REQUEST,
            *args
        )


class UsernameAlreadyExists(ApiError):
    def __init__(self, *args: object) -> None:
        super().__init__(
            'Another user beat you to this name, sorry :^(',
            HTTPStatus.BAD_REQUEST,
            *args
        )


class DevNameAlreadyExists(ApiError):
    def __init__(self, *args: object) -> None:
        super().__init__(
            'Another dev beat you this name, sorry :^(',
            HTTPStatus.BAD_REQUEST,
            *args
        )


class EmailAlreadyExists(ApiError):
    def __init__(self, *args: object) -> None:
        super().__init__(
            'There\'s already an account for this email, either you forgot to take your medications and forgot'
            + ' that you have an account, or someone used your email without your knowledge :^O',
            HTTPStatus.BAD_REQUEST,
            *args
        )


class GameNameAlreadyExists(ApiError):
    def __init__(self, *args: object) -> None:
        super().__init__('A game with this name already exists, sorry :^(',
                         HTTPStatus.BAD_REQUEST,
                         *args
                         )


class IllegalAccess(ApiError):
    def __init__(self, *args: object) -> None:
        super().__init__(
            'You do not have permissions to access the resource, you dirty hacker >:^(',
            HTTPStatus.FORBIDDEN,
            *args
        )


class UserDoesNotExist(ApiError):
    def __init__(self, *args: object) -> None:
        super().__init__(
            'This user does not exist... or do they? No they don\'t, you messed up somewhere :^|',
            HTTPStatus.BAD_REQUEST,
            *args
        )


class DevDoesNotExist(ApiError):
    def __init__(self, *args: object) -> None:
        super().__init__(
            'This dev does not exist... or do they? No they don\'t, you messed up somewhere :^|',
            HTTPStatus.BAD_REQUEST,
            *args
        )


class GameDoesNotExist(ApiError):
    def __init__(self, *args: object) -> None:
        super().__init__(
            'This game does not exist... yet! Seize the oppurunity! >:^D',
            HTTPStatus.BAD_REQUEST,
            *args
        )

class ResourceDoesNotExist(ApiError):
    def __init__(self, *args: object) -> None:
        super().__init__(
            'The resource you asked for doesn\'t exist, you messed up :^(',
            HTTPStatus.BAD_REQUEST,
            *args
        )