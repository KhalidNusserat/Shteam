import shteamUncolored from './img/shteam_logo_uncolored.png'
import shteamColored from './img/shteam_logo_colored.png'

const CONSTANTS = {
    SERVER: {
        URL : 'http://127.0.0.1:5000'
    },
    SHTEAM_LOGO_UNCOLORED: shteamUncolored,
    SHTEAM_LOGO_COLORED: shteamColored,
    DRAWER: {
        WIDTH: 240
    },
    SETTINGS: {
        AVATAR: {
            LENGTH: 250
        },
        TEXTFIELD: {
            WIDTH: 400
        }
    },
    ERRORS: [
        'USERNAME_PASSWORD_MISMATCH',
        'USERNAME_ALREADY_EXISTS'
    ] as const,
    GAME: {
        WIDTH: 350,
        IMAGE: {
            HEIGHT: 250
        }
    },
    DEV_GAMES: {
        GAME: {
            IMAGE: {
                LENGTH: 200
            }
        }
    }
}

export default CONSTANTS;