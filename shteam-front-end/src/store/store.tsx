import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import loginPageReducer from './loginPageSlice'
import signupPageReducer from './signupPageSlice'
import userSettingsPageReducer from './user/userSettingsPageSlice'
import userInfoReducer from './user/userInfoSlice'
import userGamesLibraryReducer from './user/userGamesLibrarySlice'
import gamesStoreReducer from './user/gamesStoreSlice'
import devSettingsPageReducer from './dev/devSettingsPageSlice'
import devInfoReducer from './dev/devInfoSlice'
import devGamesReducer from './dev/devGamesSlice'

export const store = configureStore({
    reducer: {
        loginPage: loginPageReducer,
        signupPage: signupPageReducer,
        userSettingsPage: userSettingsPageReducer,
        userInfo: userInfoReducer,
        userGamesLibrary: userGamesLibraryReducer,
        gamesStore: gamesStoreReducer,
        devSettingsPage: devSettingsPageReducer,
        devGames: devGamesReducer,
        devInfo: devInfoReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector as TypedUseSelectorHook<RootState>;