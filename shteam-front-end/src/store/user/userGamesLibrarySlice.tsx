import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameData } from '../../helpers';
import API from '../../api/API';

type GamesLibraryState = {
    games: GameData[]
};

const initialState: GamesLibraryState = {
    games: []
};

export const getUserGames = createAsyncThunk(
    'userGamesLibrary/getUserGames',
    async () => {
        return await API.Game.getGamesFromIds(await API.User.getGames());
    }
)

export const userGamesLibrarySlice = createSlice({
    name: 'userGamesLibrary',
    initialState,
    reducers: {
        setGames: (state, action: PayloadAction<GameData[]>) => {
            state.games = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(getUserGames.fulfilled, (state, {payload}) => {
            state.games = payload;
        });
    }
});

export const { setGames } = userGamesLibrarySlice.actions;
export default userGamesLibrarySlice.reducer;